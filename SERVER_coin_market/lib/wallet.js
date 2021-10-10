import {Coin, Asset} from "../models/modelManager.js";
import {coinList} from "../datas/coinList.js";

export const wallet = async function (req, res) {
	const coinCodes = Object.keys(coinList);
	const document = {};
	const assetInfo = {};
	const wholeAsset = {};
	for (let i = 0; i < coinCodes.length; i++) {
		let code = coinCodes[i];
		document[code] = await Coin.find({code});
		assetInfo[code] = await Asset.find({
			user: req.user,
			coin: document[code][0]._id,
		});
		wholeAsset[code] = assetInfo[code][0].quantity;
	}
	return wholeAsset;
};
