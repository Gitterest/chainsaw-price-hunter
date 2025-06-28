# Chainsaw Price Hunter Backend

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Proxy Configuration for Scraping
PROXY_URL=
SCRAPING_API_URL=
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/scraper/prices` - Scrape with region/city filters
- `GET /api/scraper/all` - Scrape all sources without filters
- `GET /api/prices` - New combined scraping endpoint (query only)

## Development

```bash
npm install
npm start
```

## Production

The backend is configured to run on Railway with automatic deployment. 