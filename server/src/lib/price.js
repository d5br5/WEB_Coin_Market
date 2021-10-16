import CoinGecko from "coingecko-api";
import {coinList} from "../datas/coinList.js";

const CoinGeckoClient = new CoinGecko();

const getCoinIdCode = (coinList) => {
	let result = {};
	let origin = Object.keys(coinList).filter((key) => key !== "usd");
	origin.forEach((coin) => (result[coin] = coinList[coin].id));
	return result;
};

export const getAllCoinPrices = async () => {
	let coinIdCode = getCoinIdCode(coinList);
	let coinCodes = Object.keys(coinIdCode);
	let coinIds = Object.values(coinIdCode);

	let document = await CoinGeckoClient.simple.price({
		ids: coinIds,
		vs_currencies: ["usd"],
	});
	const prices = [];
	coinCodes.forEach((code) => {
		prices.push({code, price: document.data[coinIdCode[code]]["usd"]});
	});
	return prices;
};

export const getCoinPrice = async (coinCode) => {
	if (!Object.keys(coinList).includes(coinCode)) return null;
	let coinId = coinList[coinCode].id;
	let document = await CoinGeckoClient.simple.price({
		ids: [coinId],
		vs_currencies: ["usd"],
	});
	return {coinCode, price: document.data[coinId]["usd"]};
};
