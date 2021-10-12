const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const coinData = async() => {
    let document = await CoinGeckoClient.simple.price({
        ids: [
          'bitcoin', 'ethereum', 'ripple', 'bitcoin-cash','tron','eos'
        ],
        vs_currencies: ['usd'],
    });
    const prices = {
        btc: document.data.bitcoin['usd'],
        eth: document.data.ethereum['usd'],
        xrp: document.data.ripple['usd'],
        bch: document.data['bitcoin-cash']['usd'],
        eos: document.data.eos['usd'],
        trx: document.data.tron['usd']
      }
      return prices;
  };

module.exports={
    coinData
};