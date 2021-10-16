import express from "express";
import {body, validationResult} from "express-validator";
import {User, Coin, Asset} from "../models/modelManager.js";
import {encryptPassword} from "../lib/encrypt.js";
import {coinList} from "../datas/coinList.js";

const router = express.Router();
router.post(
	"/",
	[
		body("name").isLength({min: 2, max: 12}),
		body("email").isEmail().isLength({max: 30}),
		body("password").isLength({min: 8, max: 16}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ok: false, error: {...errors.array()[0]}});
		}
		const {email, name, password} = req.body;
		if (await User.findOne({email})) {
			return res
				.status(200)
				.json({ok: false, error: {param:"email", msg: "already registered"}});
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

		for (const code of coinArray) {
			asset[code] = new Asset({
				user,
				coin: coin[code],
				quantity: coinList[code].initQuantity,
			});
		}

		for (const elem of Object.keys(asset)) {
			await asset[elem].save();
		}
		return res.status(200).json({ok: true, data: {result: "Created!"}});
	}
);

export default router;
