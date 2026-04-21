import { getOrderData } from "../lib/api-utils.js";

const xsollaStartURL = "https://secure.xsolla.com/paystation2/?access_token=";
let sessions = {}; // Should match the sessions from login.js

export async function onRequest(context) {
  const { request } = context;

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { email, dealId } = await request.json();

    if (!email || !dealId) {
      return new Response(
        JSON.stringify({ error: "Email and dealId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const bearer = sessions?.[email];

    if (!bearer) {
      return new Response(
        JSON.stringify({ error: "Session expired. Please login again." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const orderData = await getOrderData(dealId, bearer);
    const dealToken = orderData.token;
    const purchaseLink = xsollaStartURL + dealToken;

    return new Response(
      JSON.stringify({
        success: true,
        link: purchaseLink,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Get link error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to get purchase link" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
