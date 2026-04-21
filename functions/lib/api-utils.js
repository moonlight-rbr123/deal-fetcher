import axios from "axios";

const standardUrl = "https://dev-nakama.winterpixel.io/";

// Send API request
async function sendReq(data, uri, auth, method, params) {
  data = JSON.stringify(data);
  if (uri.includes("rpc")) data = JSON.stringify(data);
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

export { sendReq, getToken, getOrderData };
