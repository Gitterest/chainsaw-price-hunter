const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer-extra'); // Use puppeteer-extra instead of puppeteer
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
require('dotenv').config();
const scraperRoutes = require('./routes/scraper.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// ✅ Connect to MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rawfabricator:mongodmon@chainsawdb.6izrg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// ✅ Define Mongoose schemas
const SearchSchema = new mongoose.Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AlertSchema = new mongoose.Schema({
  query: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Search = mongoose.model("Search", SearchSchema);
const Alert = mongoose.model("Alert", AlertSchema);

// CORS configuration - allow both development and production origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://chainsaw-price-hunter-production.up.railway.app',
  'https://sawprice-hunter-backend-production.up.railway.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/scraper', scraperRoutes);

// ✅ Combined API Route
app.get("/api/prices", async (req, res) => {
  const { query } = req.query;
  
  if (!query) return res.status(400).json({ error: "Search query is required" });

  try {
    // Save search query to MongoDB
    await new Search({ query }).save();

    // Import scrapers
    const { scrapeFacebookMarketplace, scrapeOfferUp, scrapeMercari } = require('./scraper');

    // Perform scraping using Promise.allSettled to capture partial results if errors occur
    const results = await Promise.allSettled([
      scrapeFacebookMarketplace(query),
      scrapeOfferUp(query),
      scrapeMercari(query)
    ]);

    const combinedResults = results
      .filter(result => result.status === "fulfilled")
      .flatMap(result => result.value.map(item => ({
        ...item,
        source: result.value.source || "Unknown"
      })));

    if (combinedResults.length === 0) {
      console.warn("⚠️ No results found for query:", query);
      return res.status(404).json({ error: "No results found" });
    }

    console.log("🔥 Combined Results:", JSON.stringify(combinedResults, null, 2));
    res.json(combinedResults);
   } catch (error) {
    console.error("🔥 Error during scraping:", error);
    res.status(500).json({ error: "Failed to scrape listings" });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '🪓 Sawprice Hunter API is running!',
    timestamp: new Date().toISOString(),
    environment: isProduction ? 'production' : 'development'
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '🪓 Sawprice Hunter API is running!',
    timestamp: new Date().toISOString(),
    environment: isProduction ? 'production' : 'development',
    cors: {
      allowedOrigins: allowedOrigins
    },
    endpoints: {
      scraper: '/api/scraper/prices',
      all: '/api/scraper/all',
      prices: '/api/prices'
    }
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS error',
      message: 'Origin not allowed',
      allowedOrigins: allowedOrigins
    });
  }
  
  res.status(500).json({ 
    error: 'Internal server error',
    message: isProduction ? 'Something went wrong' : err.message,
    timestamp: new Date().toISOString()
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`🔗 CORS origins: ${allowedOrigins.join(', ')}`);
});
