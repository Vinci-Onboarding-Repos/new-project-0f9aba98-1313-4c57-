const BASE_URL = 'https://us-central1-vinci-dev-6e577.cloudfunctions.net/api/public/onboardingview';
"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;
const Fortmatic = window.Fortmatic;
let web3Modal
let provider;


/**
 * Setup the orchestra
 */
function init() {

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
  });

}

/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("chainChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
});

const fetchUsers = () => {
  console.log(window.location.href.split('/')[window.location.href.split('/').length - 1]);
  console.log(window.location.href);
  axios.get(BASE_URL, {
    params: {
      url: window.location.href,
      API_KEY: 'VINCI_DEV_6E577'
    }, headers: { "Access-Control-Allow-Origin": "*" }
  })
    .then(response => {
      const users = response.data.data;
      console.log(`GET list users`, users);
    })
    .catch(error => console.error(error));
};

fetchUsers();
