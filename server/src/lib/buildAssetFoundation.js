import {Coin, Asset} from "../models/modelManager.js";
import {getCoinPrice} from "./price.js";

export const buildFoundation = async (req, all) => {
	const {coin_name: order_coin} = req.params;

	let quantity = 0;
	let orderQuantity = 0;
	if (!all) {
		quantity = req.body.quantity;
		orderQuantity = parseFloat(Number(quantity).toFixed(4));
	}

	const document = {
		usd: await Coin.findOne({code: "usd"}),
		coin: await Coin.findOne({code: order_coin}),
	};

	if (!document.coin) return {ok: false, data: null};

	const assetInfo = {
		usd: await Asset.findOne({user: req.user, coin: document.usd._id}),
		coin: await Asset.findOne({user: req.user, coin: document.coin._id}),
	};

	const asset = {
		usd: assetInfo.usd.quantity,
		coin: assetInfo.coin.quantity,
	};

	const coinInfo = await getCoinPrice(order_coin);
	const coinPrice = coinInfo.price;
	const orderPrice = coinPrice * orderQuantity;
	const fullBuyQuantity =
		Math.floor(Number((10000 * asset.usd) / coinPrice)) / 10000;
	const fullBuyPrice = fullBuyQuantity * coinPrice;
	const fullSellQuantity = asset.coin;
	const fullSellPrice = fullSellQuantity * coinPrice;

	return {
		ok: true,
		data: {
			asset,
			assetInfo,
			orderPrice,
			orderQuantity,
			coinPrice,
			fullBuyQuantity,
			fullSellQuantity,
			fullBuyPrice,
			fullSellPrice,
		},
	};
};
