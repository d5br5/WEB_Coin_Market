import express from "express";
import {authentication} from "../lib/authentication.js";
import {buildFoundation} from "../lib/buildAssetFoundation.js";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Go to trade Coin!");
});

router.post("/sell/:coin_name", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, false);
	if (!ok)
		return res.status(200).json({ok: false, error: {coin: "no such coin"}});

	const {asset, assetInfo, orderPrice, orderQuantity, coinPrice} = data;
	if (asset.coin > orderQuantity) {
		assetInfo.coin.quantity = asset.coin - orderQuantity;
		assetInfo.usd.quantity = asset.usd + orderPrice;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res
			.status(200)
			.json({ok: true, data: {price: coinPrice, quantity: orderQuantity}});
	} else {
		return res.status(200).json({ok: false, error: {coin: "not enough coin"}});
	}
});

router.post("/buy/:coin_name", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, false);
	if (!ok)
		return res.status(200).json({ok: false, error: {coin: "no such coin"}});

	const {asset, assetInfo, orderPrice, orderQuantity, coinPrice} = data;
	if (asset.usd > orderPrice) {
		assetInfo.coin.quantity = asset.coin + orderQuantity;
		assetInfo.usd.quantity = asset.usd - orderPrice;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res
			.status(200)
			.json({ok: true, data: {price: coinPrice, quantity: orderQuantity}});
	} else {
		return res.status(200).json({ok: false, error: {coin: "not enough usd"}});
	}
});

router.post("/buy/:coin_name/all", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, true);
	if (!ok)
		return res.status(200).json({ok: false, error: {coin: "no such coin"}});

	const {asset, assetInfo, coinPrice, fullBuyPrice, fullBuyQuantity} = data;
	if (fullBuyPrice > 0) {
		assetInfo.coin.quantity = asset.coin + fullBuyQuantity;
		assetInfo.usd.quantity = 0;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res
			.status(200)
			.json({ok: true, data: {price: coinPrice, quantity: fullBuyQuantity}});
	} else {
		return res.status(200).json({ok: false, error: {coin: "no usd"}});
	}
});

router.post("/sell/:coin_name/all", authentication, async (req, res) => {
	const {ok, data} = await buildFoundation(req, true);
	if (!ok)
		return res.status(200).json({ok: false, error: {coin: "no such coin"}});

	const {asset, assetInfo, coinPrice, fullSellPrice, fullSellQuantity} = data;
	if (fullSellPrice > 0) {
		assetInfo.coin.quantity = 0;
		assetInfo.usd.quantity = asset.usd + fullSellPrice;
		await assetInfo.coin.save();
		await assetInfo.usd.save();
		return res
			.status(200)
			.json({ok: true, data: {price: coinPrice, quantity: fullSellQuantity}});
	} else {
		return res.status(200).json({ok: false, error: {coin: "no usd"}});
	}
});

export default router;
