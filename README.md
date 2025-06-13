# 🪓 Chainsaw Price Hunter

Multi-platform application that scrapes chainsaw prices from sources like Facebook Marketplace, displays results on a web dashboard, and supports a mobile UI.

## 🧠 Features
- Scrapes chainsaw listings using Puppeteer + Stealth mode
- Stores results in MongoDB Atlas
- REST API with Express.js
- Web interface built with Next.js
- Mobile interface built with Expo (React Native)
- Deployable to Railway with Docker support

## 🚀 Stack
- Backend: Node.js, Puppeteer, MongoDB
- Frontend: Next.js (React)
- Mobile: React Native (Expo)
- Deployment: Docker + Railway

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

# Mobile (requires Expo CLI)
cd frontend-mobile
npm install
npx expo start
```

Create a `.env.local` file in `frontend` to point the UI at your backend:

```
# Local development
NEXT_PUBLIC_API_BASE=http://localhost:5000/api

# Production example
# NEXT_PUBLIC_API_BASE=https://sawprice-hunter-backend-production.up.railway.app/api
```

## 🔍 Hidden Fun

Try entering the classic Konami code on the homepage for a small surprise.
