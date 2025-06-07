import axios from 'axios';

export default async function handler(req, res) {
  const { query, region, city } = req.query;

  if (!query || !region || !city) {
    return res.status(400).json({ error: 'Missing query, region, or city' });
  }

  try {
    const response = await axios.get(
      'https://sawprice-hunter-backend-production.up.railway.app/api/prices',
      {
        params: { query, region, city },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy API error:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.error || 'Failed to fetch listings';

    return res.status(status).json({ error: message });
  }
}
