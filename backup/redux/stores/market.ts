import {BUY, SIGNIN} from "../modules/asset";

const SETINIT = "SETINIT" as const;
const SETCOINS = "SETCOINS" as const;
const SETSIDE = "SETSIDE" as const;
const SETISLOGGEDIN = "SETISLOGGEDIN" as const;
const SETLOGINPROCESS = "SETLOGINPROCESS" as const;
const SETUSER = "SETUSER" as const;
const SETASSET = "SETASSET" as const;
const SETTOKEN = "SETTOKEN" as const;
const SETASSETLOADING = "SETASSETLOADING" as const;

export const setInit = () => ({type: SETINIT});
export const setCoins = (coins: Coin[]) => ({type: SETCOINS, payload: coins});
export const setSide = (side: string) => ({type: SETSIDE, payload: side});
export const setIsLoggedIn = (isLog: boolean) => ({
	type: SETISLOGGEDIN,
	payload: isLog,
});

export const setLoginProcess = (process: string) => ({
	type: SETLOGINPROCESS,
	payload: process,
});

export const setUser = (user: string) => ({type: SETUSER, payload: user});
export const setAsset = (asset: Asset) => ({type: SETASSET, payload: asset});
export const setToken = (token: string) => ({type: SETTOKEN, payload: token});
export const setAssetLoading = (loading: boolean) => ({
	type: SETASSETLOADING,
	payload: loading,
});

const initialState: MarketState = {
	init: false,
	coins: [],
	side: BUY,
	isLoggedIn: false,
	loginProcess: SIGNIN,
	user: "",
	asset: {},
	token: "",
	assetLoading: true,
};

function marketReducer(
	state: MarketState = initialState,
	action: MarketAction
) {
	switch (action.type) {
		case SETINIT:
			return {...state, init: true};
		case SETCOINS:
			return {...state, coins: action.payload};
		case SETSIDE:
			return {...state, side: action.payload};
		case SETISLOGGEDIN:
			return {...state, isLoggedIn: action.payload};
		case SETLOGINPROCESS:
			return {...state, loginProcess: action.payload};
		case SETUSER:
			return {...state, user: action.payload};
		case SETASSET:
			return {...state, asset: action.payload};
		case SETTOKEN:
			return {...state, token: action.payload};
		case SETASSETLOADING:
			return {...state, assetLoading: action.payload};
		default:
			return state;
	}
}

export default marketReducer;
