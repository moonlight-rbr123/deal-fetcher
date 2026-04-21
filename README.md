# Deal Fetcher

A web application that generates purchase links for game deals. Deploy in minutes with a simple Node.js host.

## Quick Start

**Fastest deployment (Railway):**
1. Go to https://railway.app
2. Connect your GitHub repo
3. It auto-deploys - done!
4. Get your live URL and share it

See [QUICK_START.md](QUICK_START.md) for step-by-step instructions.

## Features
- User-friendly login interface
- View available game deals
- Generate shareable purchase links
- One-click deploy on Railway, Heroku, or any Node.js host

## Installation

For local development:

```bash
npm install
npm start
```

Visit `http://localhost:3000`

## Deployment

The app works best deployed as a **single, unified application** on platforms like:

- **Railway** (Recommended - easiest)
- **Heroku**
- **Render**
- Any Node.js hosting

Both frontend and backend run together on the same domain with no configuration needed.

See [QUICK_START.md](QUICK_START.md) for deployment options.

## How It Works

1. User logs in with their game account
2. Available deals are fetched
3. User selects a deal
4. A payment link is generated
5. User can copy or open the link to complete purchase

All transactions with the payment provider are handled securely.