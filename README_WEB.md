# Deal Fetcher - Web Interface

A simple web interface for fetching and purchasing game deals.

## Features

✅ **Web-based Interface** - Access from any browser  
✅ **User Authentication** - Secure login with email and password  
✅ **Deal Selection** - View and select from available deals as buttons  
✅ **Purchase Links** - Get Xsolla payment links with one click  
✅ **Copy & Open** - Easily copy or open purchase links  
✅ **Responsive Design** - Works on desktop and mobile devices  

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Login** - Enter your account credentials (email and password)
2. **View Deals** - After logging in, you'll see all available deals as buttons
3. **Get Purchase Link** - Click on any deal button to get the Xsolla payment link
4. **Complete Purchase** - Copy the link or click "Open Link" to purchase

## Project Structure

```
deal-fetcher/
├── server.js           # Express server with API endpoints
├── colorlog.js         # Color logging utility
├── index.js            # Original CLI interface (legacy)
├── package.json        # Project dependencies
├── README.md           # This file
└── public/
    └── index.html      # Web interface
```

## API Endpoints

- **POST /api/login** - Authenticate user and get available deals
  - Body: `{ email: string, password: string }`
  - Returns: `{ success: boolean, deals: Array, message: string }`

- **POST /api/get-link** - Get purchase link for a deal
  - Body: `{ email: string, dealId: string }`
  - Returns: `{ success: boolean, link: string }`

## Files

- `server.js` - Express server with backend API logic
- `public/index.html` - Modern, responsive web interface with:
  - Login form
  - Deal selection buttons
  - Purchase link display
  - Copy to clipboard functionality
  - Responsive design

## Running the CLI Version

To run the original command-line interface:
```bash
node index.js
```

Or with pre-filled credentials:
```bash
node index.js your-email@example.com your-password
```

## Requirements

- Node.js 14+
- Active internet connection (for API requests)
