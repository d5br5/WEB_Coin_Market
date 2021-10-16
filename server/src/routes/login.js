import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import {encryptPassword} from "../lib/encrypt.js";
import {User, Key} from "../models/modelManager.js";

const router = express.Router();

router.post("/", async function (req, res) {
	const {email, password} = req.body;
	const user = await User.findOne({email, password: encryptPassword(password)});
	if (!user) {
		return res.status(200).json({ok: false, error: {user: "No such User"}});
	}

	const publicKey = crypto.randomBytes(64).toString("hex");
	const secretKey = crypto.randomBytes(64).toString("hex");
	const psKey = new Key({user, publicKey, secretKey});
	await psKey.save();

	const token = jwt.sign({pub: publicKey}, secretKey, {expiresIn: 60 * 60});
	return res.status(200).json({ok: true, data: {publicKey, secretKey, token, user:user.name}});
});

router.post("/key", async function (req, res) {
	const {key} = req.body;
	let decodedPK = "";
	try {
		decodedPK = jwt.decode(key).pub;
	} catch (e) {
		return res.status(200).json({ok: false, error: {token: "invalid token"}});
	}

	const psKey = await Key.findOne({publicKey: decodedPK});
	try {
		jwt.verify(key, psKey.secretKey, function (err, decoded) {
			if (err || decoded.exp * 1000 < Date.now()) {
				if (err) console.log("token error happend!");
				throw e;
			}
		});
	} catch (e) {
		return res.status(200).send({ok: false, error: {token: "token error"}});
	}

	const user = await User.findOne({_id: psKey.user});
	if (!user)
		return res.status(200).json({ok: false, error: {user: "no such user"}});

	return res.status(200).json({ok: true, data: {user: user.name}});
});

export default router;
