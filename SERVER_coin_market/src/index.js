import express from "express";
import mongoose from "mongoose";
import * as Routers from "./routes/routeManager.js";
import dotenv from "dotenv";
dotenv.config();

const mongoDBLink = process.env.mongoDBLink;
const app = express();
const port = 4000;

mongoose
	.connect(mongoDBLink, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("successfully connected to mongodb"))
	.catch((e) => console.error(e));

app.use(express.urlencoded({extended: true}));
app.use("/", Routers.indexRouter);
app.use("/create-coin", Routers.createCoinRouter);
app.use("/register", Routers.registerRouter);
app.use("/login", Routers.loginRouter);
app.use("/coins", Routers.coinRouter);
app.use("/assets", Routers.assetRouter);
app.use("/trade", Routers.tradeRouter);

app.use(function (req, res) {
	res.status(404).send("404 error : No Such Page");
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("500 error : Check Your Fault");
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
