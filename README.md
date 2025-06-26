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

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

Create a `.env.local` file in `frontend` to point the UI at your backend:

```
# Local development
NEXT_PUBLIC_API_BASE=http://localhost:5000/api

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

---

**Note**: The crypto donation section remains unchanged as requested. All new features are additive and don't affect existing functionality.
