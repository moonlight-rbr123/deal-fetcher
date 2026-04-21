const prompt = require("prompt-sync")({ sigint: true });

const axios = require("axios");

const color = require("./colorlog.js");
color.colors = [
  {
    name: "success",
    color: "32",
  },
  {
    name: "info",
    color: "34",
  },
  {
    name: "danger",
    color: "31",
  },
  {
    name: "warning",
    color: "33",
  },
  {
    name: "sub",
    color: "30",
  },
  {
    name: "special",
    color: "35",
  },
];

/*requires*/

const standardUrl = "https://dev-nakama.winterpixel.io/";
const xsollaStartURL = "https://secure.xsolla.com/paystation2/?access_token=";

var bearer;

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
        console.log(`API Error ${err.response.status}:`, err.response.data);
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

async function getOrderData(deal) {
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
    console.log(err);
    throw new Error("Product already purchased.");
  }
}

(async () => {
  try {
    //
    // Allow command-line arguments for testing: node index.js email@example.com password
    let email = process.argv[2] || prompt("Enter Account Email: ");
    let password = process.argv[3] || prompt("Enter Account Password: ");

    color.log("[§[i]Getting token§§]");
    let token = await getToken(email, password);
    bearer = "Bearer " + token;

    color.log("[§[i]Getting active deals§§]");
    let configs = JSON.parse(
      await sendReq({}, "v2/rpc/winterpixel_get_config", bearer, "post").then(
        (data) => data.payload,
      ),
    );
    let activeDeals = Object.entries(configs.shop_skus)
      .filter(
        ([objName, objValue]) =>
          (objName.includes("deal") && objValue) || objName === "starterpack",
      )
      .map(([dealName, dealDesc]) => {
        return { name: dealDesc, id: dealName };
      });
    color.log(
      `[§[suc]Active deals found:\n${activeDeals
        .map((deal) => `§[sp]${deal.name}§§`)
        .join(",\n")}\n]`,
    );
    let selectedDealPrompt = prompt("Which deal would you like to purchase?: ");
    let selectedDeal = activeDeals.find(
      (deal) => deal.name === selectedDealPrompt,
    );

    if (!selectedDeal) throw new Error("Invalid deal chosen.");

    let dealToken = await getOrderData(selectedDeal.id).then(
      (data) => data.token,
    );

    color.log(
      `[§[i]Open this link in your browser to purchase the product: §[sp]${
        xsollaStartURL + dealToken
      }§§]`,
    );
    //
  } catch (e) {
    color.log(`§[d]${e}§§`);
  }
})();
