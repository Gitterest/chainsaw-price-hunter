import { fetchSawPrices } from '../../lib/scrape'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const { query, region } = req.query
  if (!query || !region) {
    return res.status(400).json({ error: 'Missing query or region' })
  }
  try {
    const listings = await fetchSawPrices(query, region)
    if (listings.length === 0) {
      return res.status(404).json({ error: 'No results found' })
    }
    res.status(200).json({ listings })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
