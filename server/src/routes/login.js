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
		return res.status(404).json({error: "No such Users"});
	}

	const publicKey = crypto.randomBytes(64).toString("hex");
	const secretKey = crypto.randomBytes(64).toString("hex");
	const psKey = new Key({user, publicKey, secretKey});
	await psKey.save();

	const token = jwt.sign({pub: publicKey}, secretKey, {expiresIn: 60 * 60});
	return res.status(200).json({publicKey, secretKey, token});
});

export default router;
