const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configuration
const standardUrl = "https://dev-nakama.winterpixel.io/";
const xsollaStartURL = "https://secure.xsolla.com/paystation2/?access_token=";

// Send API request
async function sendReq(data, uri, auth, method, params) {
  data = JSON.stringify(data);
  if (uri.includes("rpc")) data = JSON.stringify(data); // has to be stringified twice for whatever reason
  return await axios({
    method: method,
    url: standardUrl + uri,
    data: data,
    headers: {
      Authorization: auth,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en;q=0.9",
    },
    params: params,
  }).then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        console.error(`API Error ${err.response.status}:`, err.response.data);
      }
      throw err;
    });
}

// Get authentication token
async function getToken(email, password) {
  let requestData = {
    email: email,
    password: password,
    vars: {
      client_version: "94387677",
    },
  };

  return await sendReq(
    requestData,
    "v2/account/authenticate/email?create=false&=",
    "Basic OTAyaXViZGFmOWgyZTlocXBldzBmYjlhZWIzOTo=",
    "post",
  ).then((res) => res.token);
}

// Get order data for a deal
async function getOrderData(deal, bearer) {
  try {
    let requestData = {
      product_id: deal,
    };

    return JSON.parse(
      await sendReq(
        requestData,
        "v2/rpc/rpc_xsolla_get_access_token",
        bearer,
        "post",
      ).then((res) => res.payload),
    );
  } catch (err) {
    console.error(err);
    throw new Error("Product already purchased.");
  }
}

// API Routes

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Get token
    const token = await getToken(email, password);
    const bearer = "Bearer " + token;

    // Get active deals
    const configs = JSON.parse(
      await sendReq({}, "v2/rpc/winterpixel_get_config", bearer, "post").then(
        (data) => data.payload,
      ),
    );

    const activeDeals = Object.entries(configs.shop_skus)
      .filter(
        ([objName, objValue]) =>
          (objName.includes("deal") && objValue) || objName === "starterpack",
      )
      .map(([dealName, dealDesc]) => {
        return { name: dealDesc, id: dealName };
      });

    // Store bearer token in session (in production, use proper session management)
    req.session = req.session || {};
    req.session.bearer = bearer;

    // Store in memory (not ideal for production, but works for this)
    global.sessions = global.sessions || {};
    global.sessions[email] = bearer;

    res.json({
      success: true,
      deals: activeDeals,
      message: `Logged in as ${email}`,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: error.message || "Failed to authenticate" });
  }
});

// Get purchase link for a deal
app.post("/api/get-link", async (req, res) => {
  try {
    const { email, dealId } = req.body;

    if (!email || !dealId) {
      return res.status(400).json({ error: "Email and dealId are required" });
    }

    // Get bearer token from session storage
    const bearer = global.sessions?.[email];

    if (!bearer) {
      return res.status(401).json({ error: "Session expired. Please login again." });
    }

    // Get order data
    const orderData = await getOrderData(dealId, bearer);
    const dealToken = orderData.token;
    const purchaseLink = xsollaStartURL + dealToken;

    res.json({
      success: true,
      link: purchaseLink,
    });
  } catch (error) {
    console.error("Get link error:", error);
    res.status(400).json({ error: error.message || "Failed to get purchase link" });
  }
});

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Deal Fetcher server is running at http://localhost:${PORT}`);
});
