import { getToken, sendReq } from "../lib/api-utils.js";

// In-memory session storage (use KV for production)
let sessions = {};

export async function onRequest(context) {
  const { request } = context;

  // Only accept POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
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

    // Store bearer token (for production, use Cloudflare KV)
    sessions[email] = bearer;

    return new Response(
      JSON.stringify({
        success: true,
        deals: activeDeals,
        message: `Logged in as ${email}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to authenticate" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
