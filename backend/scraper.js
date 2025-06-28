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

// Add proxy support
const proxyUrl = process.env.PROXY_URL;
if (proxyUrl) {
  console.log('Using proxy:', proxyUrl);
  launchOptions.args.push(`--proxy-server=${proxyUrl}`);
}

// SCRAPING API INTEGRATION
// If SCRAPING_API_URL is set, use it as the proxy for all scrapers
const scrapingApiUrl = process.env.SCRAPING_API_URL;
if (scrapingApiUrl) {
  console.log('Using scraping API as proxy:', scrapingApiUrl);
  process.env.PROXY_URL = scrapingApiUrl;
}

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

// Fallback data for when scraping fails - using different chainsaw images
const fallbackData = [
  {
    title: "Husqvarna 562 XP G MARK II",
    price: "$1009.99",
    image: "https://www-static-nw.husqvarna.com/-/images/aprimo/husqvarna/chainsaws/photos/studio/cw-214781.webp?v=9d2a2924148fd9b9&format=WEBP_LANDSCAPE_CONTAIN_XXL",
    url: "https://www.husqvarna.com/us/chainsaws/562xp-g-mark-ii/",
    source: "Fallback"
  },
  {
    title: "Husqvarna T525",
    price: "$589.99",
    image: "https://www-static-nw.husqvarna.com/-/images/aprimo/husqvarna/chainsaws/photos/studio/h110-0481.webp?v=f9e9b167148fd9b9&format=WEBP_LANDSCAPE_CONTAIN_XXL",
    url: "https://www.husqvarna.com/us/chainsaws/t525/",
    source: "Fallback"
  },
  {
    title: "STIHL MS 201 T C-M",
    price: "$799.99",
    image: "https://stihlusa-images.imgix.net/Product/2880/ms201tcm.png?w=692&h=692&fit=fill&auto=format,compress&fill=solid",
    url: "https://www.stihlusa.com/products/chain-saws/in-tree-saws/ms201tcm/",
    source: "Fallback"
  },
  {
    title: "STIHL MS 500i",
    price: "$1329.99",
    image: "https://stihlusa-images.imgix.net/Product/3255/ms500i.png?w=692&h=692&fit=fill&auto=format,compress&fill=solid",
    url: "https://www.stihlusa.com/products/chain-saws/professional-saws/ms500i/",
    source: "Fallback"
  },
  {
    title: "Jonsered CS 2255",
    price: "$499.99",
    image: "https://www.usa.jonsered.com/ddoc/JONI/JONI2021_USen/JONI2021_USen_2255P-966532301.png",
    url: "https://www.usa.jonsered.com/us/products/chainsaws/cs-2255/",
    source: "Fallback"
  },
  {
    title: "Echo CS-590 Timber Wolf",
    price: "$419.99",
    image: "https://www.echo-usa.com/getmedia/ede35f9d-8a2c-4087-bef8-7589a7b3ef85/CS-590-1.png",
    url: "https://www.echo-usa.com/Products/Chainsaws/CS-590",
    source: "Fallback"
  },
  {
    title: "McCulloch CS 380",
    price: "$189.99",
    image: "https://www.mcculloch.com/ddoc/MCCO/MCCO2015_EUen/MCCO2015_EUen_CS-380T-967320601.png",
    url: "https://www.mcculloch.com/uk/products/chainsaws/cs-380/",
    source: "Fallback"
  },
  {
    title: "McCulloch CS 450 Elite",
    price: "$359.99",
    image: "https://www.mcculloch.com/ddoc/MCCO/MCCO2015_EUen/MCCO2015_EUen_CS-450ELITE-966631713.png",
    url: "https://www.mcculloch.com/uk/products/chainsaws/cs-450-elite/",
    source: "Fallback"
  },
  {
    title: "Homelite 18 in. 42cc Gas Chainsaw",
    price: "$149.00",
    image: "https://images.thdstatic.com/productImages/8a35a64a-dfe4-42a2-94f3-529f35b8f3b5/svn/homelite-gas-chainsaws-ut10568a-64_600.jpg",
    url: "https://www.homedepot.com/p/Homelite-18-in-42cc-Gas-Chainsaw-UT10568A/203681790",
    source: "Fallback"
  },
  {
    title: "Poulan Pro PR5020",
    price: "$199.99",
    image: "https://www.poulanpro.com/globalassets/catalog/productimages/chainsaws/pr5020-967061501.png",
    url: "https://www.poulanpro.com/us/products/chainsaws/pr5020/",
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
            image: image || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format', 
            url: link || '', 
            source: 'Facebook' 
          });
        }
      }
    } catch (error) {
      console.error('Facebook scraping failed:', error.message, error.stack);
      if (page) {
        try {
          const content = await page.content();
          console.error('Facebook page HTML (first 1000 chars):', content.slice(0, 1000));
        } catch (e) {
          console.error('Failed to get Facebook page HTML:', e.message);
        }
      }
    } finally {
      if (browser) await browser.close();
    }
    
    if (!listings.length) {
      console.log('Facebook: No listings found, returning fallback data');
      return { listings: fallbackData };
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
            image: image || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format', 
            url: link || '', 
            source: 'OfferUp' 
          });
        }
      }
    } catch (error) {
      console.error('OfferUp scraping failed:', error.message, error.stack);
      if (page) {
        try {
          const content = await page.content();
          console.error('OfferUp page HTML (first 1000 chars):', content.slice(0, 1000));
        } catch (e) {
          console.error('Failed to get OfferUp page HTML:', e.message);
        }
      }
    } finally {
      if (browser) await browser.close();
    }
    
    if (!listings.length) {
      console.log('OfferUp: No listings found, returning fallback data');
      return { listings: fallbackData };
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
            image: image || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format', 
            url: link || '', 
            source: 'Mercari' 
          });
        }
      }
    } catch (error) {
      console.error('Mercari scraping failed:', error.message, error.stack);
      if (page) {
        try {
          const content = await page.content();
          console.error('Mercari page HTML (first 1000 chars):', content.slice(0, 1000));
        } catch (e) {
          console.error('Failed to get Mercari page HTML:', e.message);
        }
      }
    } finally {
      if (browser) await browser.close();
    }
    
    if (!listings.length) {
      console.log('Mercari: No listings found, returning fallback data');
      return { listings: fallbackData };
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
