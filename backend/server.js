const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const scraperRoutes = require('./routes/scraper.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Allow overriding the frontend URL via env variable for local development
const corsOptions = {
  origin: process.env.CLIENT_URL || 
    (isProduction ? 
      ['https://chainsaw-price-hunter-production.up.railway.app', 'https://sawprice-hunter-frontend-production.up.railway.app'] :
      'http://localhost:3000'
    ),
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/scraper', scraperRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🪓 Sawprice Hunter API is running!');
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '🪓 Sawprice Hunter API is running!',
    timestamp: new Date().toISOString(),
    environment: isProduction ? 'production' : 'development',
    endpoints: {
      scraper: '/api/scraper/prices',
      all: '/api/scraper/all'
    }
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: isProduction ? 'Something went wrong' : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`🔗 CORS origins: ${corsOptions.origin}`);
});
