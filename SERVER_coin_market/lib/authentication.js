import e from "express";
import jwt from "jsonwebtoken";
import {User, Key, Asset} from "../models/modelManager.js";

export const authentication = async (req, res, next) => {
	const {authorization} = req.headers;
	if (!authorization) {
		return res.status(401).json({error: "no authorized"});
	}
	const [bearer, key] = authorization.split(" ");
	if (bearer !== "Bearer") {
		return res.status(401).json({error: "no bearer key"});
	}
	req.token = key;
	let decodedPK = "";
	try {
		decodedPK = jwt.decode(key).pub;
	} catch (e) {
		return res.status(400).json({error: "invalid token"});
	}

	const psKey = await Key.findOne({publicKey: decodedPK});
	console.log(psKey);

	try {
		jwt.verify(key, psKey.secretKey, function (err, decoded) {
			console.log(decoded);
			console.log(Date.now());

			if (err || decoded.exp * 1000 < Date.now()) {
				if (err) console.log("token error happend!");
				throw e;
			}
		});
	} catch (e) {
		return res.status(400).send({error: "token error"});
	}

	const user = await User.findOne({_id: psKey.user});
	if (!user) return res.status(401).json({error: "no such user"});
	req.user = user;
	req.assets = await Asset.find({user: req.user});
	next();
};
