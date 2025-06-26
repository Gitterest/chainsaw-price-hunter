const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const randomUseragent = require('random-useragent');

puppeteer.use(StealthPlugin());

const launchOptions = {
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

// User-agent rotation for anti-bot evasion
function getUserAgent() {
  return randomUseragent.getRandom() ||
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
}

async function launchStealthBrowser() {
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setUserAgent(getUserAgent());
  await page.setViewport({ width: 1280, height: 800 });
  return { browser, page };
}

// Facebook Marketplace Scraper (public search)
async function scrapeFacebookMarketplace(query = 'chainsaw') {
  let browser;
  let page;
  const listings = [];
  try {
    ({ browser, page } = await launchStealthBrowser());
    const url = `https://www.facebook.com/marketplace/search/?query=${encodeURIComponent(query)}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(6000);
    // Facebook DOM is dynamic; use robust selectors
    const articles = await page.$$('[role="article"]');
    for (let card of articles.slice(0, 5)) {
      let title = '', image = '', link = '';
      try {
        title = await card.$eval('span', el => el.innerText).catch(() => '');
        image = await card.$eval('img', el => el.src).catch(() => '');
        link = await card.$eval('a', a => a.href).catch(() => '');
      } catch (e) {
        // fallback: skip this card
        continue;
      }
      listings.push({ title: title || 'No title', image: image || '', url: link || '', source: 'Facebook' });
    }
  } catch (error) {
    console.error('Facebook scraping failed:', error.message);
  } finally {
    if (browser) await browser.close();
  }
  return { listings };
}

// OfferUp Scraper
async function scrapeOfferUp(query = 'chainsaw') {
  let browser;
  let page;
  const listings = [];
  try {
    ({ browser, page } = await launchStealthBrowser());
    const searchUrl = `https://offerup.com/search/?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('div[data-testid="item-tile"]', { timeout: 10000 });
    const items = await page.$$('div[data-testid="item-tile"]');
    for (let card of items.slice(0, 5)) {
      let title = '', price = '', image = '', link = '';
      try {
        title = await card.$eval('h2', el => el.innerText).catch(() => '');
        price = await card.$eval('span[data-testid="item-price"]', el => el.innerText).catch(() => '');
        image = await card.$eval('img', el => el.src).catch(() => '');
        link = await card.$eval('a', a => 'https://offerup.com' + a.getAttribute('href')).catch(() => '');
      } catch (e) {
        continue;
      }
      listings.push({ title: title || 'No title', price: price || 'N/A', image: image || '', url: link || '', source: 'OfferUp' });
    }
  } catch (error) {
    console.error('OfferUp scraping failed:', error.message);
  } finally {
    if (browser) await browser.close();
  }
  return { listings };
}

// Mercari Scraper
async function scrapeMercari(query = 'chainsaw') {
  let browser;
  let page;
  const listings = [];
  try {
    ({ browser, page } = await launchStealthBrowser());
    const searchUrl = `https://www.mercari.com/search/?keyword=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('li[data-testid="item-cell"]', { timeout: 10000 });
    const cards = await page.$$('li[data-testid="item-cell"]');
    for (let card of cards.slice(0, 5)) {
      let title = '', price = '', image = '', link = '';
      try {
        title = await card.$eval('[data-testid="item-title"]', el => el.innerText).catch(() => '');
        price = await card.$eval('[data-testid="item-price"]', el => el.innerText).catch(() => '');
        image = await card.$eval('img', img => img.src).catch(() => '');
        link = await card.$eval('a', a => 'https://www.mercari.com' + a.getAttribute('href')).catch(() => '');
      } catch (e) {
        continue;
      }
      listings.push({ title: title || 'No title', price: price || 'N/A', image: image || '', url: link || '', source: 'Mercari' });
    }
  } catch (error) {
    console.error('Mercari scraping failed:', error.message);
  } finally {
    if (browser) await browser.close();
  }
  return { listings };
}

module.exports = {
  scrapeFacebookMarketplace,
  scrapeOfferUp,
  scrapeMercari
};
