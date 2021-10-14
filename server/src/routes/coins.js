import express from "express";
import {getAllCoinPrices, getCoinPrice} from "../lib/price.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const prices = await getAllCoinPrices();
	return res.status(200).json({ok: true, data: prices});
});

router.get("/:coin_name", async (req, res) => {
	const {
		params: {coin_name},
	} = req;
	const price = await getCoinPrice(coin_name);
	if (price === null)
		return res.status(404).json({ok: false, error: {coin: "No Such Coin"}});
	return res.status(200).json({ok: true, data: price});
});

export default router;
