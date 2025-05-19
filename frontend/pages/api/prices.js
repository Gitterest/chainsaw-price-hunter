// pages/api/prices.js – Proxy to external backend
export default async function handler(req, res) {
  const { query, region, city } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  // Build external API URL from environment variable
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') || '';
  const params = new URLSearchParams({ query });
  if (region) params.append('region', region);
  if (city) params.append('city', city);

  try {
    const apiRes = await fetch(`${API_BASE}/api/prices?${params.toString()}`);
    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Failed to fetch listings' });
  }
}
