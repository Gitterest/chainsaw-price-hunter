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
node server.js

# Frontend
cd frontend
npm install
npm run dev

# Mobile (requires Expo CLI)
cd frontend-mobile
npm install
npx expo start
