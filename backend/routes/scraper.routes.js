const express = require('express');
const router = express.Router();
const {
  scrapeOfferUp,
  scrapeMercari,
  fallbackData
} = require('../scraper');

// GET /api/scraper/test — simple test endpoint that returns fallback data
router.get('/test', (req, res) => {
  console.log('Test endpoint called');
  res.json({ 
    message: 'API is working!',
    listings: fallbackData,
    timestamp: new Date().toISOString()
  });
});

// GET /api/scraper/all — scrape all sources without filters
router.get('/all', async (req, res) => {
  try {
    const results = await Promise.allSettled([
      scrapeOfferUp(),
      scrapeMercari()
    ]);

    const listings = [];
    results.forEach((r, index) => {
      if (r.status === 'fulfilled' && r.value && r.value.listings && Array.isArray(r.value.listings)) {
        console.log(`Scraper ${index + 1} succeeded with ${r.value.listings.length} results`);
        listings.push(...r.value.listings);
      } else {
        console.error(`❌ Scraper ${index + 1} failed:`, r.reason || 'No valid data returned');
      }
    });

    // Use empty array if no listings found
    if (!listings.length) {
      console.log('No listings found, returning empty array');
      return res.json({ listings: [] });
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
      scrapeOfferUp(query),
      scrapeMercari(query)
    ]);

    const listings = [];
    results.forEach((r, index) => {
      if (r.status === 'fulfilled' && r.value && r.value.listings && Array.isArray(r.value.listings)) {
        console.log(`Scraper ${index + 1} succeeded with ${r.value.listings.length} results`);
        listings.push(...r.value.listings);
      } else {
        console.error(`❌ Scraper ${index + 1} failed:`, r.reason || 'No valid data returned');
      }
    });

    console.log(`Total listings found: ${listings.length}`);

    // Use empty array if no listings found
    if (!listings.length) {
      console.log('No listings found, returning empty array');
      return res.json({ listings: [] });
    }

    res.json({ listings });
  } catch (error) {
    console.error('❌ Scraping error:', error);
    // Return fallback data instead of error
    res.json({ listings: fallbackData });
  }
});

module.exports = router;
