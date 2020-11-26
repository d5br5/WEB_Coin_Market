var express = require('express')
var router = express.Router()
const template = require('../lib/template.js');
const { coinData } = require('../lib/pricing.js');
const { authentication } = require('../lib/authentication.js');

const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

router.get("/", async (req, res) => {
  // const coins = await Coin.find();
  // res.send(coins);
  const prices = await coinData();
  let datalist =
    `<ul>
    <li> Bitcoin (BTC) : ${prices.bitcoin} (usd) <a href='/coins/bitcoin'>거래</a> </li>
    <li> Ethereum (ETH) : ${prices.ethereum} (usd) <a href='/coins/ethereum'>거래</a> </li>
    <li> Ripple (XRP)  : ${prices.ripple} (usd) <a href='/coins/ripple'>거래</a> </li>
    <li> Bitcoin Cash (BCH)  : ${prices['bitcoin-cash']} (usd) <a href='/coins/bitcoin-cash'>거래</a> </li>
    <li> Eos (EOS)  : ${prices.eos} (usd) <a href='/coins/eos'>거래</a> </li>
    <li> Tron (TRX)  : ${prices.tron} (usd) <a href='/coins/tron'>거래</a> </li>
    </ul>`
  const html = template.HTML('CoinData', datalist);
  res.send(html);
});

router.get("/:coin_name", async (req, res) => {
  const wannaCoin = req.params.coin_name;
  let form = `
  <form action="/coins/${wannaCoin}/buy" method="post">
    <p>wanna buy</p>
    <p><input type="number" name="quantity" placeholder="quantity"> ${wannaCoin}</p>
    <p><input type="submit" value="Buy"></p>
  </form>
  <form action="/coins/${wannaCoin}/sell" method="post">
    <p>wanna sell</p>
    <p><input type="number" name="quantity" placeholder="quantity"> ${wannaCoin}</p>
    <p><input type="submit" value="Sell"></p>
  </form>`;
  const html = template.HTML(wannaCoin, form);
  res.send(html);
});

router.post("/:coin_name/buy", authentication, async (req, res) => {
  const { quantity } = req.body;
  const buyCoin = req.params.coin_name;
  res.send({ buyCoin, quantity });

  const doc_usd = await Coin.find({ code: 'usd' });
  const id_usd = doc_usd[0]._id
  const assetInfo_usd = await Asset.find({ user: req.user, coin: id_usd});
  const asset_usd = assetInfo_usd[0].quantity;

  const doc_coin = await Coin.find({ code: buyCoin });
  const id_coin = doc_coin[0]._id
  const assetInfo_coin = await Asset.find({ user: req.user, coin: id_coin});
  const asset_coin = assetInfo_coin[0].quantity;

  const prices = await coinData();
  const coinQuantity = parseFloat(Number(quantity).toFixed(4));
  const coinPrice = prices[buyCoin];
  const totalPrice = coinQuantity * coinPrice;

  if (asset_usd > totalPrice) {
    console.log('rich to buy');
    const usdAfter = asset_usd - totalPrice ;
    const coinAfter = asset_coin + coinQuantity;
        
    let dealCoin = await Asset.findOne({ coin: id_coin, user: req.user });
    dealCoin.quantity = coinAfter;
    await dealCoin.save();

    let dealUsd = await Asset.findOne({ coin: id_usd, user: req.user });
    dealUsd.quantity = usdAfter;
    await dealUsd.save();

  } else {
    console.log('fool guyss..');
  }

});

router.post("/:coin_name/sell", async (req, res) => {
  const { quantity } = req.body;
  const sellCoin = req.params.coin_name;
  res.send({ sellCoin, quantity });
});

module.exports = router;