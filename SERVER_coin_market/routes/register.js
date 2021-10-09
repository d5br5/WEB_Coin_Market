import express from "express";
import {body, validationResult} from "express-validator";
import {User, Coin, Asset} from "../models/modelManager.js";
import {encryptPassword} from "../lib/encrypt.js";
import {coinList} from "../datas/coinList.js";

const router = express.Router();
router.post(
	"/",
	[
		body("name").isAlphanumeric().isLength({min: 4, max: 12}),
		body("email").isEmail().isLength({max: 30}),
		body("password").isLength({min: 8, max: 16}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const {email, name, password} = req.body;
		if (await User.findOne({email})) {
			return res.status(400).json({errors: {email: "Already registered"}});
		}

		const encryptedPassword = encryptPassword(password);
		const user = new User({email, name, password: encryptedPassword});
		await user.save();

		const coin = {};
		const asset = {};
		const coinArray = Object.keys(coinList);

		for (let i = 0; i < coinArray.length; i++) {
			let code = coinArray[i];
			coin[code] = await Coin.findOne({code: coinList[code].code});
		}

		coinArray.forEach(async (code) => {
			asset[code] = new Asset({
				user,
				coin: coin[code],
				quantity: coinList[code].initQuantity,
			});
		});

		Object.keys(asset).forEach(async (elem) => await asset[elem].save());
		return res.status(200).json({result: "Created!"});
	}
);

export default router;
