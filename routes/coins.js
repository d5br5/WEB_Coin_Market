var express = require('express');
var router = express.Router();

const { coinData } = require('../lib/pricing.js');
const { authentication } = require('../lib/authentication.js');
const { wallet } = require('../lib/wallet.js');

const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

router.get("/", async (req, res) => {
  const prices = await coinData();
  res.send(prices);
});

router.get("/:coin_name", async (req, res) => {
  const prices = await coinData();
  const wannaCoin = req.params.coin_name;
  if (!prices[wannaCoin]) return res.sendStatus(404);
  res.send(`price : ${prices[wannaCoin]}`);
});

router.post("/:coin_name/buy", authentication, async (req, res) => {
  const { quantity } = req.body;
  const buyCoin = req.params.coin_name;

  const document = {
    usd: await Coin.findOne({ code: 'usd' }),
    coin: await Coin.findOne({ code: buyCoin })
  };

  if (!document.coin) { return res.sendStatus(404) };

  const assetInfo = {
    usd: await Asset.findOne({ user: req.user, coin: document.usd._id }),
    coin: await Asset.findOne({ user: req.user, coin: document.coin._id })
  }

  const asset = {
    usd: assetInfo.usd.quantity,
    coin: assetInfo.coin.quantity
  }

  const prices = await coinData();
  const coinQuantity = parseFloat(Number(quantity).toFixed(4));
  const coinPrice = prices[buyCoin];
  const totalPrice = coinQuantity * coinPrice;

  if (asset.usd > totalPrice) {
    console.log('you are rich enough to buy. wait.. processing... ');

    assetInfo.coin.quantity = asset.coin + coinQuantity;
    assetInfo.usd.quantity = asset.usd - totalPrice;

    await assetInfo.coin.save();
    await assetInfo.usd.save();

    const assets = await wallet(req, res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your usd asset!');
    res.sendStatus(404);
  }
});

router.post("/:coin_name/sell", authentication, async (req, res) => {
  const { quantity } = req.body;
  const sellCoin = req.params.coin_name;

  const document = {
    usd: await Coin.findOne({ code: 'usd' }),
    coin: await Coin.findOne({ code: sellCoin })
  };
  if (!document.coin) { return res.sendStatus(404) };

  const assetInfo = {
    usd: await Asset.findOne({ user: req.user, coin: document.usd._id }),
    coin: await Asset.findOne({ user: req.user, coin: document.coin._id })
  };

  const asset = {
    usd: assetInfo.usd.quantity,
    coin: assetInfo.coin.quantity
  };

  const prices = await coinData();
  const coinQuantity = parseFloat(Number(quantity).toFixed(4));
  const coinPrice = prices[sellCoin];
  const totalPrice = coinQuantity * coinPrice;

  if (asset.coin > coinQuantity) {
    console.log('you have enough coin to sell. wait.. processing... ');

    assetInfo.coin.quantity = asset.coin - coinQuantity;
    assetInfo.usd.quantity = asset.usd + totalPrice;

    await assetInfo.coin.save();
    await assetInfo.usd.save();

    const assets = await wallet(req, res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your coin asset!');
    res.sendStatus(404);
  }
});

router.get("/:coin_name/buy/all", authentication, async (req, res) => {
  const buyCoin = req.params.coin_name;

  const document = {
    usd: await Coin.findOne({ code: 'usd' }),
    coin: await Coin.findOne({ code: buyCoin })
  };

  if (!document.coin) { return res.sendStatus(404) };

  const assetInfo = {
    usd: await Asset.findOne({ user: req.user, coin: document.usd._id }),
    coin: await Asset.findOne({ user: req.user, coin: document.coin._id })
  }

  const asset = {
    usd: assetInfo.usd.quantity,
    coin: assetInfo.coin.quantity
  }

  const prices = await coinData();
  const coinPrice = prices[buyCoin];
  const canBuyQ = Math.floor(Number(10000 * asset.usd / coinPrice)) / 10000; //n.toPrecision(4)
  const totalPrice = canBuyQ * coinPrice;

  if (totalPrice > 0) {
    console.log('buy all. Do not regret. wait.. processing... ');
   
    assetInfo.coin.quantity = asset.coin + canBuyQ;
    assetInfo.usd.quantity = asset.usd - totalPrice;

    await assetInfo.coin.save();
    await assetInfo.usd.save();

    const assets = await wallet(req, res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your usd asset!');
  }

});

router.get("/:coin_name/sell/all", authentication, async (req, res) => {
  const sellCoin = req.params.coin_name;

  const document = {
    usd: await Coin.findOne({ code: 'usd' }),
    coin: await Coin.findOne({ code: sellCoin })
  };
  if (!document.coin) { return res.sendStatus(404) };

  const assetInfo = {
    usd: await Asset.findOne({ user: req.user, coin: document.usd._id }),
    coin: await Asset.findOne({ user: req.user, coin: document.coin._id })
  };

  const asset = {
    usd: assetInfo.usd.quantity,
    coin: assetInfo.coin.quantity
  };

  const prices = await coinData();
  const canSellQ = asset.coin;
  const coinPrice = prices[sellCoin];
  const totalPrice = canSellQ * coinPrice;

  if (totalPrice > 0) {
    console.log('Sell your whole coins.. Do not regret. wait.. processing... ');
    
    assetInfo.coin.quantity = asset.coin - canSellQ;
    assetInfo.usd.quantity = asset.usd + totalPrice;

    await assetInfo.coin.save();
    await assetInfo.usd.save();

    const assets = await wallet(req, res);
    console.log(assets);
    res.send(assets);
  } else {
    console.log('fool guyss.. check your coin asset!');
  }
});

module.exports = router;