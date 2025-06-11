import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to fetch dummy data
async function fetchListings(query) {
  try {
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    return res.data.products || [];
  } catch (err) {
    console.error('Scraper error:', err.message);
    try {
      const data = await fs.readFile(new URL('./data/listings.json', import.meta.url));
      const listings = JSON.parse(data);
      return listings.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    } catch (e) {
      console.error('Fallback data read failed:', e.message);
      return null;
    }
  }
}

app.get('/api/prices', async (req, res) => {
  const { query, region, city } = req.query;
  if (!query || !region || !city) {
    return res.status(400).json({ error: 'Missing query, region, or city' });
  }

  const listings = await fetchListings(query);
  if (!listings) {
    // send empty result but not server error
    return res.status(200).json({ listings: [], error: 'scraper failed' });
  }

  res.json({ listings });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
