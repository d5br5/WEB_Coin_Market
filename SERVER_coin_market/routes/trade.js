import express from "express";
import {Coin, Asset} from "../models/modelManager.js";
import {getCoinPrice} from "../lib/price.js";
import {authentication} from "../lib/authentication.js";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Go to trade Coin!");
});

const buildFoundation = async (req, all) => {
	const {coin_name: order_coin} = req.params;

	let quantity = 0;
	let orderQuantity = 0;
	if (!all) {
		quantity = req.body.quantity;
		orderQuantity = parseFloat(Number(quantity).toFixed(4));
	}

	const document = {
		usd: await Coin.findOne({code: "usd"}),
		coin: await Coin.findOne({code: order_coin}),
	};

	if (!document.coin) return {ok: false, data: null};

	const assetInfo = {
		usd: await Asset.findOne({user: req.user, coin: document.usd._id}),
		coin: await Asset.findOne({user: req.user, coin: document.coin._id}),
	};

	const asset = {
		usd: assetInfo.usd.quantity,
		coin: assetInfo.coin.quantity,
	};

	const coinInfo = await getCoinPrice(order_coin);
	const coinPrice = coinInfo.price;
	const orderPrice = coinPrice * orderQuantity;
	const fullBuyQuantity =
		Math.floor(Number((10000 * asset.usd) / coinPrice)) / 10000;
	const fullBuyPrice = fullBuyQuantity * coinPrice;
	const fullSellQuantity = asset.coin;
	const fullSellPrice = fullSellQuantity * coinPrice;

	return {
		ok: true,
		data: {
			asset,
			assetInfo,
			orderPrice,
			orderQuantity,
			coinPrice,
			fullBuyQuantity,
			fullSellQuantity,
			fullBuyPrice,
			fullSellPrice,
		},
	};
};

router.post("/buy/:coin_name", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, false);
	if (!ok) return res.status(404).json({errors: {coin: "no such coin.."}});

	const {asset, assetInfo, orderPrice, orderQuantity, coinPrice} = data;
	if (asset.usd > orderPrice) {
		assetInfo.coin.quantity = asset.coin + orderQuantity;
		assetInfo.usd.quantity = asset.usd - orderPrice;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res.status(200).json({price: coinPrice, quantity: orderQuantity});
	} else {
		return res.status(402).json({errors: {asset: "not enough usd"}});
	}
});

router.post("/sell/:coin_name", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, false);
	if (!ok) return res.status(404).json({errors: {coin: "no such coin.."}});

	const {asset, assetInfo, orderPrice, orderQuantity, coinPrice} = data;
	if (asset.coin > orderQuantity) {
		assetInfo.coin.quantity = asset.coin - orderQuantity;
		assetInfo.usd.quantity = asset.usd + orderPrice;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res.status(200).json({price: coinPrice, quantity: orderQuantity});
	} else {
		return res.status(402).json({errors: {asset: "not enough coin"}});
	}
});

router.post("/buy/:coin_name/all", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, true);
	if (!ok) return res.status(404).json({errors: {coin: "no such coin.."}});

	const {asset, assetInfo, coinPrice, fullBuyPrice, fullBuyQuantity} = data;
	if (fullBuyPrice > 0) {
		assetInfo.coin.quantity = asset.coin + fullBuyQuantity;
		assetInfo.usd.quantity = 0;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res.status(200).json({price: coinPrice, quantity: fullBuyQuantity});
	} else {
		return res.status(402).json({errors: {asset: "no usd"}});
	}
});

router.post("/sell/:coin_name/all", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, true);
	if (!ok) return res.status(404).json({errors: {coin: "no such coin.."}});

	const {asset, assetInfo, coinPrice, fullSellPrice, fullSellQuantity} = data;
	if (fullSellPrice > 0) {
		assetInfo.coin.quantity = 0;
		assetInfo.usd.quantity = asset.usd + fullSellPrice;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res.status(200).json({price: coinPrice, quantity: fullSellQuantity});
	} else {
		return res.status(402).json({errors: {asset: "no usd"}});
	}
});

export default router;
