# Quick Start: Deploying Deal Fetcher

## The Issue (Fixed!)
Your app didn't work on GitHub Pages, Cloudflare, or Netlify because they only host **static files**, not Node.js servers. The frontend was looking for backend APIs that didn't exist.

## The Solution
The frontend now supports **custom API endpoints**. You can deploy the backend anywhere and point the frontend to it!

---

## Fastest Setup (5 minutes)

### Step 1: Deploy Backend
Choose one platform and deploy the backend:

**Railway.app** (Recommended - easiest):
1. Go to https://railway.app
2. Click "Create new project" → "Deploy from GitHub repo"
3. Select this repo
4. It auto-runs `npm start` and gives you a URL like `https://deal-fetcher-production.up.railway.app`
5. Copy this URL

**Alternative: Heroku**
```bash
heroku create your-app-name
git push heroku main
heroku logs --tail
# Get URL from Heroku dashboard
```

### Step 2: Deploy Frontend

**GitHub Pages**:
1. Push to GitHub
2. Settings → Pages → Enable Pages
3. Visit: `https://yourusername.github.io/deal-fetcher?api=YOUR_BACKEND_URL`

**Netlify**:
1. Drag-drop the `public/` folder to https://app.netlify.com
2. Open your site
3. Click ⚙️ **API Settings**
4. Paste your backend URL
5. Click Save

**Cloudflare Pages**:
1. Go to Pages → Create project → Upload files
2. Upload files from `public/` folder
3. Open your site
4. Click ⚙️ **API Settings** 
5. Paste your backend URL
6. Click Save

---

## Configuration Methods

### Method 1: URL Parameter (Easiest!)
Just add `?api=` to the end of your frontend URL:
```
https://your-site.netlify.app/?api=https://deal-fetcher-production.up.railway.app
```

### Method 2: In-App Settings Button
1. Open the frontend
2. Click ⚙️ **API Settings** 
3. Enter backend URL
4. Click Save

The URL will be saved to your browser for future visits!

### Method 3: Browser Console
Open browser DevTools (F12) and run:
```javascript
localStorage.setItem('dealFetcherApi', 'https://your-backend-url.com');
location.reload();
```

---

## Example Backend URLs

| Platform | URL Format |
|----------|-----------|
| Railway | `https://your-app-production.up.railway.app` |
| Heroku | `https://your-app-name.herokuapp.com` |
| Local | `http://localhost:3000` |
| Render | `https://your-app-name.onrender.com` |

---

## Troubleshooting

**"Failed to fetch" error?**
- Check your API URL is correct (starts with `http://` or `https://`)
- Make sure backend is running
- Check browser console (F12) for error details

**"Invalid request" error?**
- Backend might be offline
- Try accessing backend URL directly in browser

**Backend URL not saving?**
- Try the URL parameter method instead: `?api=YOUR_URL`
- Clear browser cache and try again

---

## For Local Development (No changes!)
```bash
npm install
npm start
# Open http://localhost:3000
# Works exactly the same as before
```

---

## Need More Details?
See `DEPLOYMENT.md` for complete deployment guide and advanced options.
