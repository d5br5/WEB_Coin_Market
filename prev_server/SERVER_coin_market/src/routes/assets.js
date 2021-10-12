import express from "express";
import {wallet} from "../lib/wallet.js";
import {authentication} from "../lib/authentication.js";

const router = express.Router();
router.get("/", authentication, async (req, res) => {
	const assets = await wallet(req, res);
	return res.status(200).json({assets});
});

export default router;
