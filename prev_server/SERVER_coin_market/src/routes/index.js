import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.send("welcome to Coin World!");
});

export default router;
