const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const scraperRoutes = require('./routes/scraper.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration - allow both development and production origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://chainsaw-price-hunter-production.up.railway.app',
  'https://sawprice-hunter-frontend-production.up.railway.app'
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
      all: '/api/scraper/all'
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`🔗 CORS origins: ${allowedOrigins.join(', ')}`);
});
