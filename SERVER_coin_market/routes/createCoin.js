import express from "express";
import {Coin} from "../models/manager.js";

const router = express.Router();

router.post("/", async (req, res) => {
	const {code} = req.body;

	if (await Coin.findOne({code})) {
		return res.status(400).json({errors: {code: "Already existed"}});
	}

	const coin = new Coin({code});
	await coin.save();

	return res.status(200).json({result: "Created!"});
});

export default router;
