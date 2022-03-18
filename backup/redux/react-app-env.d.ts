/// <reference types="react-scripts" />
type Coin = {code: string; price: number};
type Asset = {[key: string]: number};

type MarketState = {
	init: boolean;
	coins: Coin[];
	side: string;
	isLoggedIn: boolean;
	loginProcess: string;
	user: string;
	asset: Asset;
	token: string;
	assetLoading: boolean;
};

type MarketAction =
	| ReturnType<typeof setInit>
	| ReturnType<typeof setCoins>
	| ReturnType<typeof setSide>
	| ReturnType<typeof setIsLoggedIn>
	| ReturnType<typeof setLoginProcess>
	| ReturnType<typeof setUser>
	| ReturnType<typeof setAsset>
	| ReturnType<typeof setToken>
	| ReturnType<typeof setAssetLoading>;
