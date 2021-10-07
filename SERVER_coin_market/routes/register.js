import express from "express";
import {body, validationResult} from "express-validator";
import {User, Coin, Key, Asset} from "../models/manager.js";
import {encryptPassword} from "../lib/encrypt.js";
import {coinList} from "../datas/coinList.js";

const router = express.Router();
router.post(
	"/",
	[
		body("name").isAlphanumeric().isLength({min: 4, max: 12}),
		body("email").isEmail().isLength({max: 100}),
		body("password").isLength({min: 8, max: 16}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const {email, name, password} = req.body;
		if (await User.findOne({email})) {
			return res.send(400).json({errors: {email: "Already registered"}});
		}

		const encryptedPassword = encryptPassword(password);
		const user = new User({email, name, password: encryptedPassword});
		await user.save();

		const coin = {};
		const asset = {};
		const coinArray = Object.keys(coinList);
		coinArray.forEach(async (coinName) => {
			coin[coinName] = await Coin.findOne({code: coinList[coinName].code});
		});
		coinArray.forEach(async (coinName) => {
			asset[coinName] = new Asset({
				user,
				coin: coin[coinName],
				quantity: coinList[coinName].initQuantity,
			});
		});
		Object.keys(asset).forEach(async (elem) => await asset[elem].save());
		return res.sendStatus(200);
	}
);

export default router;
