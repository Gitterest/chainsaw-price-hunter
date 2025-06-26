# 🪓 Chainsaw Price Hunter

Multi-platform application that scrapes chainsaw prices from sources like Facebook Marketplace, displays results on a web dashboard, and supports a mobile UI.

## 🧠 Features
- **Advanced Scraping**: Robust scrapers for Facebook Marketplace, OfferUp, and Mercari with anti-bot evasion
- **Stunning UI**: Animated backgrounds, neon effects, parallax scrolling, and micro-interactions
- **Interactive Elements**: Animated chainsaw mascot, cursor trails, and dynamic result cards
- **Easter Eggs**: Konami code with confetti and sound effects, secret dark mode toggle
- **Future-Proof**: User-agent rotation, error handling, and resilient selectors
- **Accessibility**: ARIA labels, keyboard navigation, and responsive design
- **Performance**: Optimized animations, lazy loading, and efficient rendering

## 🚀 Stack
- **Backend**: Node.js, Puppeteer with Stealth, MongoDB
- **Frontend**: Next.js (React), Framer Motion, Canvas Confetti
- **Styling**: SCSS modules, Tailwind CSS, custom animations
- **Deployment**: Docker + Railway

## 🎮 Easter Eggs & Hidden Features
- **Konami Code**: Press ↑↑↓↓←→←→BA for a chainsaw surprise with confetti and sound
- **Cursor Trail**: Animated gradient trail follows your mouse movement
- **Secret Dark Mode**: Hidden toggle in the footer (invisible button)
- **Animated Background**: SVG parallax effects with chainsaw-themed elements

## 📦 Development

### Quick Start
```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend only
npm run dev:frontend # Frontend only
```

### Manual Setup
```bash
# Backend
cd backend
npm install
npm start

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

Create a `.env.local` file in `frontend` to point the UI at your backend:

```
# Local development
NEXT_PUBLIC_API_BASE=http://localhost:5000

# Production example
# NEXT_PUBLIC_API_BASE=https://sawprice-hunter-backend-production.up.railway.app
```

## 🔧 Recent Improvements

### Backend Enhancements
- ✅ Fixed Facebook Marketplace URL (public search instead of private)
- ✅ Updated OfferUp and Mercari selectors for current DOM
- ✅ Added user-agent rotation for anti-bot evasion
- ✅ Improved error handling and logging
- ✅ Added fallback logic for missing data

### Frontend Visual Overhaul
- ✅ Animated SVG background with parallax effects
- ✅ Neon glow effects and micro-interactions
- ✅ Enhanced result cards with hover animations
- ✅ Interactive chainsaw mascot and cursor trails
- ✅ Secret dark mode toggle
- ✅ Improved accessibility and responsiveness

### Easter Eggs
- ✅ Upgraded Konami code with confetti and sound
- ✅ Animated chainsaw with shake effect
- ✅ Cursor trail with gradient colors
- ✅ Hidden dark mode toggle

## 🎨 Visual Features
- **Animated Background**: SVG gradients, chainsaw shapes, and sparkles
- **Neon Effects**: Glowing text, borders, and interactive elements
- **Micro-Interactions**: Hover effects, scale animations, and smooth transitions
- **Responsive Design**: Flawless experience on all devices
- **Performance Optimized**: Efficient animations and lazy loading

## 🔍 API Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/scraper/all` - Scrape all sources without filters
- `GET /api/scraper/prices` - Scrape with query, region, and city parameters

## 🛡️ Anti-Bot Measures
- User-agent rotation
- Stealth plugin integration
- Random delays and timeouts
- Robust error handling
- Fallback selectors

## 🎯 Future-Proof Features
- Modular scraper architecture
- Configurable selectors
- Comprehensive logging
- Graceful degradation
- Easy maintenance

## 🔧 Troubleshooting

### Common Issues

#### 1. Search Error / API Not Found
**Problem**: Getting "API endpoint not found" or connection errors
**Solution**: 
- Ensure backend is running: `cd backend && npm start`
- Check if backend is on port 5000: `http://localhost:5000/api/health`
- Verify API base URL in frontend: `frontend/src/utils/api.js`

#### 2. 404 Audio File Error
**Problem**: chainsaw-01.mp3 not found
**Solution**:
- Ensure `chainsaw-01.mp3` is in `frontend/public/` directory
- Check file permissions and case sensitivity
- Audio file should be accessible at `http://localhost:3000/chainsaw-01.mp3`

#### 3. Scraping Fails
**Problem**: No results returned from scrapers
**Solution**:
- Check browser console for detailed error logs
- Verify internet connection
- Some sites may block automated requests
- Try different search terms or locations

#### 4. Build Errors
**Problem**: Frontend build fails
**Solution**:
- Run `npm install` in frontend directory
- Clear Next.js cache: `rm -rf .next`
- Check for missing dependencies

### Testing
```bash
# Test API endpoints
node test-api.js

# Test frontend build
cd frontend && npm run build

# Check for linting issues
cd frontend && npm run lint
```

### Debug Mode
- Backend logs detailed scraping information
- Frontend console shows API requests and responses
- Check browser Network tab for failed requests

---

**Note**: The crypto donation section remains unchanged as requested. All new features are additive and don't affect existing functionality.
