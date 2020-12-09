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
        bitcoin: document.data.bitcoin['usd'],
        ethereum: document.data.ethereum['usd'],
        ripple: document.data.ripple['usd'],
        'bitcoin-cash': document.data['bitcoin-cash']['usd'],
        eos: document.data.eos['usd'],
        tron: document.data.tron['usd']
      }
      return prices;
  };

module.exports={
    coinData
};