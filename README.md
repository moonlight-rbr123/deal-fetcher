# Deal Fetcher

A web application that generates purchase links for game deals.

## Quick Links
- **Getting Started**: See [QUICK_START.md](QUICK_START.md) for the fastest setup
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment options
- **What Was Fixed**: See [FIX_SUMMARY.md](FIX_SUMMARY.md) for technical details

## Features
- Login to your game account
- View available deals
- Generate purchase links
- Copy and share links with others
- Works with GitHub Pages, Netlify, Cloudflare, and traditional servers

## Installation

```bash
npm install
npm start
```

Visit `http://localhost:3000`

## Deployment

### Simple Option: Everything on One Server
Deploy to Heroku, Railway, Render, or similar - they'll run both frontend and backend automatically.

### Advanced Option: Separate Frontend from Backend
1. Deploy backend to Railway/Heroku (get the URL)
2. Deploy `public/` folder as static site to GitHub Pages/Netlify/Cloudflare
3. Use the API Settings button in the app to point frontend to your backend

See [QUICK_START.md](QUICK_START.md) for step-by-step instructions.

## Architecture

- **Backend**: Express.js server (`server.js`) - handles API requests to gaming services
- **Frontend**: HTML/CSS/JavaScript (`public/index.html`) - user interface
- Both can be deployed together or separately

## How It Works

1. User logs in with their game account credentials
2. Backend authenticates and retrieves available deals
3. User selects a deal
4. Backend generates a payment link
5. User can copy or open the link to complete purchase

## Configuration

If your backend is on a different domain (deployment scenario), use the ⚙️ **API Settings** button in the app to configure it.

Or use URL parameter: `?api=https://your-backend-url.com`