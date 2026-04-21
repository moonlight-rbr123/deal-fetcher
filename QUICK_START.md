# Quick Start: Deploying Deal Fetcher

## The Solution
Deploy the entire app (backend + frontend together) on a single server. It's a fully consumer-ready site with no configuration needed!

---

## Fastest Setup (10 minutes)

### Step 1: Deploy to Railway.app (Easiest)

1. Go to https://railway.app and sign up
2. Click **"Create new project"** → **"Deploy from GitHub repo"**
3. Select this `deal-fetcher` repository
4. Railway automatically detects Node.js and deploys it
5. Get your live URL (looks like `https://deal-fetcher-production.up.railway.app`)
6. **Done!** Visit that URL - it's live and ready to use

### Step 2: (Optional) Custom Domain
In Railway dashboard:
1. Go to your project
2. Click **"Domain"**
3. Add your custom domain (e.g., `deals.yoursite.com`)

---

## Alternative: Deploy to Heroku

```bash
# Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create your-app-name
git push heroku main

# Get your live URL
heroku open
```

---

## Local Development

```bash
npm install
npm start
```

Visit `http://localhost:3000` - same experience as production!

---

## How It Works

- Frontend and backend run on the **same domain**
- No configuration needed - it just works
- Users experience a seamless, professional app
- All deals and purchases work instantly

---

## Troubleshooting

**App won't deploy?**
- Check that Node.js 14+ is available
- Ensure all dependencies install: `npm install`

**Port issues locally?**
- Server runs on port 3000 by default
- Modify `server.js` if needed

**Need help?**
- Check Railway/Heroku logs for error details
