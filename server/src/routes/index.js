import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	return res
		.status(200)
		.json({ok: true, data: {result: "Welcome to Coin World"}});
});

export default router;
