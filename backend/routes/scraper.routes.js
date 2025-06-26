const express = require('express');
const router = express.Router();
const {
  scrapeFacebookMarketplace,
  scrapeOfferUp,
  scrapeMercari,
  fallbackData
} = require('../scraper');

// GET /api/scraper/all — scrape all sources without filters
router.get('/all', async (req, res) => {
  try {
    const results = await Promise.allSettled([
      scrapeFacebookMarketplace(),
      scrapeOfferUp(),
      scrapeMercari()
    ]);

    const listings = [];
    results.forEach(r => {
      if (r.status === 'fulfilled') {
        listings.push(...r.value.listings);
      } else {
        console.error('❌ Scraper error:', r.reason);
      }
    });

    // Use fallback data if no listings found
    if (!listings.length) {
      console.log('No listings found, using fallback data');
      return res.json({ listings: fallbackData });
    }

    res.json({ listings });
  } catch (error) {
    console.error('❌ Scraping error:', error);
    // Return fallback data instead of error
    res.json({ listings: fallbackData });
  }
});

// GET /api/scraper/prices — proxy for frontend with required params
router.get('/prices', async (req, res) => {
  const { query, region, city } = req.query;

  console.log('Received scraper request:', { query, region, city });

  if (!query || !region || !city) {
    console.log('Missing required parameters');
    return res.status(400).json({ error: "Missing query, region, or city" });
  }

  try {
    console.log('Starting scraping for:', query);
    const results = await Promise.allSettled([
      scrapeFacebookMarketplace(query),
      scrapeOfferUp(query),
      scrapeMercari(query)
    ]);

    const listings = [];
    results.forEach((r, index) => {
      if (r.status === 'fulfilled') {
        console.log(`Scraper ${index + 1} succeeded with ${r.value.listings.length} results`);
        listings.push(...r.value.listings);
      } else {
        console.error(`❌ Scraper ${index + 1} failed:`, r.reason);
      }
    });

    console.log(`Total listings found: ${listings.length}`);

    // Use fallback data if no listings found
    if (!listings.length) {
      console.log('No listings found, using fallback data');
      return res.json({ listings: fallbackData });
    }

    res.json({ listings });
  } catch (error) {
    console.error('❌ Scraping error:', error);
    // Return fallback data instead of error
    res.json({ listings: fallbackData });
  }
});

module.exports = router;
