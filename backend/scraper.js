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
    '--disable-gpu'
  ]
};

// User-agent rotation for anti-bot evasion
function getUserAgent() {
  return randomUseragent.getRandom() ||
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
}

async function launchStealthBrowser() {
  try {
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setUserAgent(getUserAgent());
    await page.setViewport({ width: 1280, height: 800 });
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
  }
];

// Facebook Marketplace Scraper (public search)
async function scrapeFacebookMarketplace(query = 'chainsaw') {
  let browser;
  let page;
  const listings = [];
  
  try {
    console.log('Starting Facebook Marketplace scraping for:', query);
    ({ browser, page } = await launchStealthBrowser());
    
    const url = `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(6000);
    
    // Facebook DOM is dynamic; use robust selectors
    const articles = await page.$$('[role="article"]');
    console.log(`Found ${articles.length} articles on Facebook`);
    
    for (let card of articles.slice(0, 5)) {
      let title = '', image = '', link = '';
      try {
        title = await card.$eval('span', el => el.innerText).catch(() => '');
        image = await card.$eval('img', el => el.src).catch(() => '');
        link = await card.$eval('a', a => a.href).catch(() => '');
      } catch (e) {
        console.log('Skipping Facebook card due to error:', e.message);
        continue;
      }
      if (title) {
        listings.push({ title: title || 'No title', image: image || '', url: link || '', source: 'Facebook' });
      }
    }
  } catch (error) {
    console.error('Facebook scraping failed:', error.message);
  } finally {
    if (browser) await browser.close();
  }
  
  console.log(`Facebook scraping completed with ${listings.length} results`);
  return { listings };
}

// OfferUp Scraper
async function scrapeOfferUp(query = 'chainsaw') {
  let browser;
  let page;
  const listings = [];
  
  try {
    console.log('Starting OfferUp scraping for:', query);
    ({ browser, page } = await launchStealthBrowser());
    
    const searchUrl = `https://offerup.com/search/?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('div[data-testid="item-tile"]', { timeout: 10000 });
    
    const items = await page.$$('div[data-testid="item-tile"]');
    console.log(`Found ${items.length} items on OfferUp`);
    
    for (let card of items.slice(0, 5)) {
      let title = '', price = '', image = '', link = '';
      try {
        title = await card.$eval('h2', el => el.innerText).catch(() => '');
        price = await card.$eval('span[data-testid="item-price"]', el => el.innerText).catch(() => '');
        image = await card.$eval('img', el => el.src).catch(() => '');
        link = await card.$eval('a', a => 'https://offerup.com' + a.getAttribute('href')).catch(() => '');
      } catch (e) {
        console.log('Skipping OfferUp card due to error:', e.message);
        continue;
      }
      if (title) {
        listings.push({ title: title || 'No title', price: price || 'N/A', image: image || '', url: link || '', source: 'OfferUp' });
      }
    }
  } catch (error) {
    console.error('OfferUp scraping failed:', error.message);
  } finally {
    if (browser) await browser.close();
  }
  
  console.log(`OfferUp scraping completed with ${listings.length} results`);
  return { listings };
}

// Mercari Scraper
async function scrapeMercari(query = 'chainsaw') {
  let browser;
  let page;
  const listings = [];
  
  try {
    console.log('Starting Mercari scraping for:', query);
    ({ browser, page } = await launchStealthBrowser());
    
    const searchUrl = `https://www.mercari.com/search/?keyword=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('li[data-testid="item-cell"]', { timeout: 10000 });
    
    const cards = await page.$$('li[data-testid="item-cell"]');
    console.log(`Found ${cards.length} items on Mercari`);
    
    for (let card of cards.slice(0, 5)) {
      let title = '', price = '', image = '', link = '';
      try {
        title = await card.$eval('[data-testid="item-title"]', el => el.innerText).catch(() => '');
        price = await card.$eval('[data-testid="item-price"]', el => el.innerText).catch(() => '');
        image = await card.$eval('img', img => img.src).catch(() => '');
        link = await card.$eval('a', a => 'https://www.mercari.com' + a.getAttribute('href')).catch(() => '');
      } catch (e) {
        console.log('Skipping Mercari card due to error:', e.message);
        continue;
      }
      if (title) {
        listings.push({ title: title || 'No title', price: price || 'N/A', image: image || '', url: link || '', source: 'Mercari' });
      }
    }
  } catch (error) {
    console.error('Mercari scraping failed:', error.message);
  } finally {
    if (browser) await browser.close();
  }
  
  console.log(`Mercari scraping completed with ${listings.length} results`);
  return { listings };
}

module.exports = {
  scrapeFacebookMarketplace,
  scrapeOfferUp,
  scrapeMercari,
  fallbackData
};
