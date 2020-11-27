const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const coinData = async() => {
    let data = await CoinGeckoClient.simple.price({
        ids: [
          'bitcoin', 'ethereum', 'ripple', 'bitcoin-cash','tron','eos'
        ],
        vs_currencies: ['usd'],
    });
    const prices = {
        bitcoin: data.data.bitcoin['usd'],
        ethereum: data.data.ethereum['usd'],
        ripple: data.data.ripple['usd'],
        'bitcoin-cash': data.data['bitcoin-cash']['usd'],
        eos: data.data.eos['usd'],
        tron: data.data.tron['usd']
      }
      return prices;
  };

module.exports={
    coinData
};