const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const randomUseragent = require('random-useragent');

puppeteer.use(StealthPlugin());

// Environment-specific launch options
const launchOptions = {
  headless: 'new',
  args: [
    '--no-sandbox', 
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor'
  ]
};

// User-agent rotation for anti-bot evasion
function getUserAgent() {
  return randomUseragent.getRandom() ||
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
}

// Timeout wrapper to prevent hanging scrapers
function withTimeout(promise, timeoutMs = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Scraping timeout')), timeoutMs)
    )
  ]);
}

async function launchStealthBrowser() {
  try {
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setUserAgent(getUserAgent());
    await page.setViewport({ width: 1280, height: 800 });
    
    // Additional stealth measures
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });
    });
    
    return { browser, page };
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw error;
  }
}

// Fallback data for when scraping fails
const fallbackData = [
  {
    title: "Husqvarna 455 Rancher Chainsaw",
    price: "$399.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
    url: "https://www.husqvarna.com/us/chainsaws/455-rancher/",
    source: "Fallback"
  },
  {
    title: "Stihl MS 271 Farm Boss Chainsaw",
    price: "$449.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
    url: "https://www.stihlusa.com/products/chain-saws/homeowner-saws/ms271/",
    source: "Fallback"
  },
  {
    title: "Echo CS-590 Timber Wolf Chainsaw",
    price: "$379.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
    url: "https://www.echo-usa.com/chain-saws/cs-590",
    source: "Fallback"
  },
  {
    title: "Makita EA4300F40B Chainsaw",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
    url: "https://www.makitatools.com/products/details/EA4300F40B",
    source: "Fallback"
  },
  {
    title: "Poulan Pro PR5020 Chainsaw",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
    url: "https://www.poulanpro.com/chain-saws/pr5020",
    source: "Fallback"
  }
];

// Facebook Marketplace Scraper (public search)
async function scrapeFacebookMarketplace(query = 'chainsaw') {
  return withTimeout(async () => {
    let browser;
    let page;
    const listings = [];
    
    try {
      console.log('Starting Facebook Marketplace scraping for:', query);
      ({ browser, page } = await launchStealthBrowser());
      
      const url = `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(3000);
      
      // Try multiple selectors for Facebook
      const selectors = [
        '[role="article"]',
        '[data-testid="marketplace_feed_item"]',
        'div[style*="border-radius"]',
        'a[href*="/marketplace/item/"]'
      ];
      
      let articles = [];
      for (const selector of selectors) {
        articles = await page.$$(selector);
        if (articles.length > 0) {
          console.log(`Found ${articles.length} articles using selector: ${selector}`);
          break;
        }
      }
      
      for (let card of articles.slice(0, 5)) {
        let title = '', image = '', link = '', price = '';
        try {
          // Try multiple selectors for title
          title = await card.$eval('span, h3, div[dir="auto"]', el => el.innerText).catch(() => '');
          if (!title) title = await card.$eval('*', el => el.innerText).catch(() => '');
          
          // Try to get image
          image = await card.$eval('img', el => el.src).catch(() => '');
          
          // Try to get link
          link = await card.$eval('a', a => a.href).catch(() => '');
          
          // Try to get price
          price = await card.$eval('[dir="auto"]', el => el.innerText).catch(() => '');
        } catch (e) {
          console.log('Skipping Facebook card due to error:', e.message);
          continue;
        }
        
        if (title && title.length > 5) {
          listings.push({ 
            title: title.substring(0, 100), 
            price: price || 'N/A', 
            image: image || '', 
            url: link || '', 
            source: 'Facebook' 
          });
        }
      }
    } catch (error) {
      console.error('Facebook scraping failed:', error.message);
    } finally {
      if (browser) await browser.close();
    }
    
    console.log(`Facebook scraping completed with ${listings.length} results`);
    return { listings };
  }, 25000); // 25 second timeout for Facebook
}

// OfferUp Scraper
async function scrapeOfferUp(query = 'chainsaw') {
  return withTimeout(async () => {
    let browser;
    let page;
    const listings = [];
    
    try {
      console.log('Starting OfferUp scraping for:', query);
      ({ browser, page } = await launchStealthBrowser());
      
      const searchUrl = `https://offerup.com/search/?q=${encodeURIComponent(query)}`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);
      
      // Try multiple selectors for OfferUp
      const selectors = [
        'div[data-testid="item-tile"]',
        'div[data-testid="item-cell"]',
        'div[class*="item"]',
        'a[href*="/item/"]'
      ];
      
      let items = [];
      for (const selector of selectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          items = await page.$$(selector);
          if (items.length > 0) {
            console.log(`Found ${items.length} items using selector: ${selector}`);
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      for (let card of items.slice(0, 5)) {
        let title = '', price = '', image = '', link = '';
        try {
          // Try multiple selectors for title
          title = await card.$eval('h2, h3, [data-testid="item-title"]', el => el.innerText).catch(() => '');
          if (!title) title = await card.$eval('*', el => el.innerText).catch(() => '');
          
          // Try to get price
          price = await card.$eval('span[data-testid="item-price"], [class*="price"]', el => el.innerText).catch(() => '');
          
          // Try to get image
          image = await card.$eval('img', el => el.src).catch(() => '');
          
          // Try to get link
          link = await card.$eval('a', a => 'https://offerup.com' + a.getAttribute('href')).catch(() => '');
        } catch (e) {
          console.log('Skipping OfferUp card due to error:', e.message);
          continue;
        }
        
        if (title && title.length > 5) {
          listings.push({ 
            title: title.substring(0, 100), 
            price: price || 'N/A', 
            image: image || '', 
            url: link || '', 
            source: 'OfferUp' 
          });
        }
      }
    } catch (error) {
      console.error('OfferUp scraping failed:', error.message);
    } finally {
      if (browser) await browser.close();
    }
    
    console.log(`OfferUp scraping completed with ${listings.length} results`);
    return { listings };
  }, 20000); // 20 second timeout for OfferUp
}

// Mercari Scraper
async function scrapeMercari(query = 'chainsaw') {
  return withTimeout(async () => {
    let browser;
    let page;
    const listings = [];
    
    try {
      console.log('Starting Mercari scraping for:', query);
      ({ browser, page } = await launchStealthBrowser());
      
      const searchUrl = `https://www.mercari.com/search/?keyword=${encodeURIComponent(query)}`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);
      
      // Try multiple selectors for Mercari
      const selectors = [
        'li[data-testid="item-cell"]',
        'div[data-testid="item-cell"]',
        'li[class*="item"]',
        'a[href*="/item/"]'
      ];
      
      let cards = [];
      for (const selector of selectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          cards = await page.$$(selector);
          if (cards.length > 0) {
            console.log(`Found ${cards.length} items using selector: ${selector}`);
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      for (let card of cards.slice(0, 5)) {
        let title = '', price = '', image = '', link = '';
        try {
          // Try multiple selectors for title
          title = await card.$eval('[data-testid="item-title"], h3, span', el => el.innerText).catch(() => '');
          if (!title) title = await card.$eval('*', el => el.innerText).catch(() => '');
          
          // Try to get price
          price = await card.$eval('[data-testid="item-price"], [class*="price"]', el => el.innerText).catch(() => '');
          
          // Try to get image
          image = await card.$eval('img', img => img.src).catch(() => '');
          
          // Try to get link
          link = await card.$eval('a', a => 'https://www.mercari.com' + a.getAttribute('href')).catch(() => '');
        } catch (e) {
          console.log('Skipping Mercari card due to error:', e.message);
          continue;
        }
        
        if (title && title.length > 5) {
          listings.push({ 
            title: title.substring(0, 100), 
            price: price || 'N/A', 
            image: image || '', 
            url: link || '', 
            source: 'Mercari' 
          });
        }
      }
    } catch (error) {
      console.error('Mercari scraping failed:', error.message);
    } finally {
      if (browser) await browser.close();
    }
    
    console.log(`Mercari scraping completed with ${listings.length} results`);
    return { listings };
  }, 20000); // 20 second timeout for Mercari
}

module.exports = {
  scrapeFacebookMarketplace,
  scrapeOfferUp,
  scrapeMercari,
  fallbackData
};
