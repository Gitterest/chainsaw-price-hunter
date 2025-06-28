# 🪓 Chainsaw Price Hunter

A multi-platform chainsaw price hunting application that scrapes and aggregates listings from Facebook Marketplace, OfferUp, and Mercari.

## 🚀 Features

- **Multi-Platform Scraping**: Facebook Marketplace, OfferUp, and Mercari
- **Real-time Search**: Find current chainsaw prices across platforms
- **Location-based Filtering**: Search by state and city
- **Modern UI**: Responsive design with animations and effects
- **Database Integration**: MongoDB for search tracking and analytics
- **Production Ready**: Deployed on Railway with Docker support

## 🏗️ Architecture

- **Frontend**: Next.js with static export, Tailwind CSS, Framer Motion
- **Backend**: Express.js with Puppeteer for web scraping
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Railway with Docker containers
- **Styling**: SCSS modules with Tailwind CSS

## 📁 Project Structure

```
chainsaw-price-hunter/
├── frontend/                 # Next.js frontend application
│   ├── components/          # React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # SCSS and CSS files
│   └── src/utils/          # Utility functions
├── backend/                 # Express.js backend API
│   ├── routes/             # API route handlers
│   ├── jobs/               # Background job workers
│   └── scraper.js          # Web scraping logic
├── Dockerfile.frontend     # Frontend Docker configuration
├── Dockerfile.backend      # Backend Docker configuration
├── nginx.conf              # Nginx configuration for static serving
├── railway.json            # Railway deployment configuration
└── nixpacks.toml          # Railway build configuration
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 20+
- MongoDB database
- Railway account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chainsaw-price-hunter
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `backend/` and `frontend/` directories:
   
   **Backend (.env)**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```
   
   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_BASE=http://localhost:5000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 5000) servers.

### Production Deployment

The application is configured for deployment on Railway:

1. **Connect your repository to Railway**
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on push to main branch

## 🔧 API Endpoints

### Backend API

- `GET /api/health` - Health check with system status
- `GET /api/scraper/prices` - Scrape with region/city filters
- `GET /api/scraper/all` - Scrape all sources without filters
- `GET /api/prices` - New combined scraping endpoint (query only)

### Frontend Routes

- `/` - Main search interface
- `/about` - About page
- `/contact` - Contact page

## 🎨 Styling & Components

### CSS Architecture

- **Tailwind CSS**: Utility-first CSS framework
- **SCSS Modules**: Component-scoped styles
- **Custom Fonts**: BleedingCowboys for branding
- **Animations**: Framer Motion for smooth interactions

### Key Components

- `InteractiveChainsaw` - Animated chainsaw decoration
- `ResultList` - Display search results
- `SearchBar` - Search input with validation
- `Loader` - Loading states
- `AnimatedBackground` - Dynamic background effects

## 🗄️ Database Schema

### Search Model
```javascript
{
  query: String,        // Search term
  timestamp: Date       // Search timestamp
}
```

### Alert Model
```javascript
{
  query: String,        // Search term
  targetPrice: Number,  // Target price for alerts
  email: String,        // User email
  timestamp: Date       // Alert creation timestamp
}
```

## 🚀 Performance Optimizations

- **Static Export**: Next.js static generation for fast loading
- **Image Optimization**: Unoptimized images for external sources
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression via Nginx

## 🔒 Security Features

- **CORS Protection**: Configured origins for API access
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and logging
- **Rate Limiting**: Built-in timeout protection for scrapers

## 🧪 Testing

Run the API test suite:
```bash
node test-api.js
```

## 📊 Monitoring

- **Health Checks**: `/api/health` endpoint for monitoring
- **Error Logging**: Comprehensive error logging
- **Database Status**: MongoDB connection monitoring
- **Performance Metrics**: Request timing and response codes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: contact@sawpricehunter.com
- Issues: GitHub Issues page

---

**Built with ❤️ for chainsaw enthusiasts everywhere**
