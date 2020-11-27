var express = require('express')
var router = express.Router()
const template = require('../lib/template.js');
const { coinData } = require('../lib/pricing.js');
const { authentication } = require('../lib/authentication.js');
const { wallet } = require('../lib/wallet.js');

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
  
  const doc_usd = await Coin.findOne({ code: 'usd' });
  const assetInfo_usd = await Asset.findOne({ user: req.user, coin: doc_usd._id});
  const asset_usd = assetInfo_usd.quantity;

  const doc_coin = await Coin.findOne({ code: buyCoin });
  const assetInfo_coin = await Asset.findOne({ user: req.user, coin: doc_coin._id});
  const asset_coin = assetInfo_coin.quantity;

  const prices = await coinData();
  const coinQuantity = parseFloat(Number(quantity).toFixed(4));
  const coinPrice = prices[buyCoin];
  const totalPrice = coinQuantity * coinPrice;

  if (asset_usd > totalPrice) {
    console.log('you are rich enough to buy. wait.. processing... ' );
    const usdAfter = asset_usd - totalPrice ;
    const coinAfter = asset_coin + coinQuantity;
        
    assetInfo_coin.quantity = coinAfter;
    await assetInfo_coin.save();

    assetInfo_usd.quantity = usdAfter;
    await assetInfo_usd.save();

    const assets = await wallet(req,res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your usd asset!');
  }

});

router.post("/:coin_name/sell", authentication, async (req, res) => {
  const { quantity } = req.body;
  const sellCoin = req.params.coin_name;
  
  const doc_usd = await Coin.findOne({ code: 'usd' });
  const assetInfo_usd = await Asset.findOne({ user: req.user, coin: doc_usd._id});
  const asset_usd = assetInfo_usd.quantity;

  const doc_coin = await Coin.findOne({ code: sellCoin });
  const assetInfo_coin = await Asset.findOne({ user: req.user, coin: doc_coin._id});
  const asset_coin = assetInfo_coin.quantity;

  const prices = await coinData();
  const coinQuantity = parseFloat(Number(quantity).toFixed(4));
  const coinPrice = prices[sellCoin];
  const totalPrice = coinQuantity * coinPrice;

  if (asset_coin > coinQuantity) {
    console.log('you have enough coin to sell. wait.. processing... ' );
    const usdAfter = asset_usd + totalPrice ;
    const coinAfter = asset_coin - coinQuantity;
        
    assetInfo_coin.quantity = coinAfter;
    await assetInfo_coin.save();

    assetInfo_usd.quantity = usdAfter;
    await assetInfo_usd.save();

    const assets = await wallet(req,res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your coin asset!');
  }
});

router.get("/:coin_name/buy/all", authentication, async (req, res) => {
  const buyCoin = req.params.coin_name;
  
  const doc_usd = await Coin.findOne({ code: 'usd' });
  const assetInfo_usd = await Asset.findOne({ user: req.user, coin: doc_usd._id});
  const asset_usd = assetInfo_usd.quantity;

  const doc_coin = await Coin.findOne({ code: buyCoin });
  const assetInfo_coin = await Asset.findOne({ user: req.user, coin: doc_coin._id});
  const asset_coin = assetInfo_coin.quantity;

  const prices = await coinData();
  const coinPrice = prices[buyCoin];
  const canBuyQ = Math.floor(Number(10000 * asset_usd / coinPrice)) / 10000 ; 
  const totalPrice = canBuyQ * coinPrice;

  if (totalPrice > 0) {
    console.log('buy all. Do not regret. wait.. processing... ' );
    const usdAfter = asset_usd - totalPrice ;
    const coinAfter = asset_coin + canBuyQ;
        
    assetInfo_coin.quantity = coinAfter;
    await assetInfo_coin.save();

    assetInfo_usd.quantity = usdAfter;
    await assetInfo_usd.save();

    const assets = await wallet(req,res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your usd asset!');
  }

});

router.get("/:coin_name/sell/all", authentication, async (req, res) => {
  const sellCoin = req.params.coin_name;
  
  const doc_usd = await Coin.findOne({ code: 'usd' });
  const assetInfo_usd = await Asset.findOne({ user: req.user, coin: doc_usd._id});
  const asset_usd = assetInfo_usd.quantity;

  const doc_coin = await Coin.findOne({ code: sellCoin });
  const assetInfo_coin = await Asset.findOne({ user: req.user, coin: doc_coin._id});
  const asset_coin = assetInfo_coin.quantity;

  const prices = await coinData();
  const canSellQ = asset_coin;
  const coinPrice = prices[sellCoin];
  const totalPrice = canSellQ * coinPrice;

  if (totalPrice>0) {
    console.log('Sell your whole coins.. Do not regret. wait.. processing... ' );
    const usdAfter = asset_usd + totalPrice ;
    const coinAfter = asset_coin - canSellQ; 
        
    assetInfo_coin.quantity = coinAfter;
    await assetInfo_coin.save();

    assetInfo_usd.quantity = usdAfter;
    await assetInfo_usd.save();

    const assets = await wallet(req,res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your coin asset!');
  }
});




module.exports = router;