# Deal Fetcher Deployment Guide

This project consists of two parts:
1. **Backend**: Node.js/Express server that handles API requests
2. **Frontend**: Static HTML/CSS/JS that calls the backend APIs

## Deployment Options

### Option 1: Deploy Everything Together (Easiest for beginners)

Deploy both frontend and backend on a Node.js hosting service:
- **Heroku** (simple, free tier available)
- **Railway** (modern, free tier)
- **Render** (simple, free tier)
- **Fly.io** (scalable)

Just push the entire project and these services will automatically run `npm start` to start the Express server.

### Option 2: Deploy Frontend Separately

Deploy the frontend to GitHub Pages, Cloudflare Pages, or Netlify, and point it to an external backend.

#### Backend Deployment

First, deploy the backend to a Node.js service (Heroku, Railway, Render, etc.) and get its URL, e.g., `https://my-backend.example.com`

#### Frontend Deployment

1. **GitHub Pages**: 
   - Push to GitHub, enable Pages in Settings
   - Add `?api=https://my-backend.example.com` to the URL when visiting, or
   - Edit the HTML file and set `localStorage.setItem('dealFetcherApi', 'https://my-backend.example.com')` in browser console

2. **Netlify**:
   - Drag and drop the `public/` folder, or
   - Connect your GitHub repo and set build command to do nothing (just serve static files)

3. **Cloudflare Pages**:
   - Create a new project and connect GitHub
   - Set build command to do nothing
   - Upload `public/` folder contents

#### Configuring the API Endpoint

Once deployed, configure the frontend to use your backend:

**Option A: URL Parameter (Easiest)**
- Visit your frontend and append `?api=https://your-backend-url.com`
- Example: `https://your-site.netlify.app/?api=https://my-backend.railway.app`
- This will save the URL in localStorage for future sessions

**Option B: Browser Console**
```javascript
localStorage.setItem('dealFetcherApi', 'https://your-backend-url.com');
// Then refresh the page
```

**Option C: Modify HTML Before Deploying**
Edit `public/index.html` and change:
```javascript
// Check localStorage
const stored = localStorage.getItem('dealFetcherApi');
if (stored) {
    return stored.replace(/\/$/, '');
}

// Add this default instead of empty string:
return 'https://your-backend-url.com';
```

### Option 3: Deploy with Netlify Functions

For Netlify, you can convert the API routes to Netlify Functions (serverless):

1. Create `netlify/functions/login.js` with the `/api/login` logic
2. Create `netlify/functions/get-link.js` with the `/api/get-link` logic
3. Update frontend to call `/.netlify/functions/login` instead of `/api/login`

This requires more setup but gives you a fully managed solution.

## Quick Start

### Local Development
```bash
npm install
npm start
# Open http://localhost:3000
```

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku open
```

### Deploy Backend to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Select this repository
4. Railway auto-detects Node.js and runs it
5. Get the deployed URL from the deployment info

### Deploy Frontend to Netlify (with External Backend)
1. Go to [netlify.com](https://netlify.com)
2. Create new site → Upload `public/` folder
3. Visit your site with `?api=https://your-backend-url`

## Troubleshooting

**"Failed to fetch" or "Network Error"**
- Check that your API endpoint URL is correct
- Ensure CORS is enabled on the backend (already enabled in `server.js`)
- Check browser console for detailed error messages

**API returns 404**
- Verify the backend is running and accessible
- Check that you're using the correct API URL

**Background image not loading**
- The background image should be in the `public/` folder
- If using external backend, ensure `background.png` is served from the backend's `public/` folder or update the path

## Environment Variables (Optional)

You can also use environment variables:
```bash
API_URL=https://my-backend.com PORT=3000 npm start
```

Then update the frontend to read from a config endpoint if needed.
