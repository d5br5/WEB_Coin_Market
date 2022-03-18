import React, {useState, useEffect} from "react";
import Title from "./Title";
import {LOGIN_KEY, BUY, SIGNIN} from "../modules/asset";
import {getAllPrice, getAsset, loginByKey} from "../modules/API";
import TradingTable from "./table/TradingTable";
import Account from "./account/Account";
import {Container, FullFrame} from "./CoinMarketStyle";
import {connect, ConnectedProps} from "react-redux";
import * as MarketAction from "../stores/market";

const CoinMarket = ({
	init,
	coins,
	isLoggedIn,
	token,
	side,
	asset,
	user,
	assetLoading,
	loginProcess,
	setCoins,
	setInit,
	setAsset,
	setIsLoggedIn,
	setAssetLoading,
	setLoginProcess,
	setSide,
	setToken,
	setUser,
}: MainPropsFromRedux) => {
	// const [init, setInit] = useState<boolean>(false);
	// const [coins, setCoins] = useState<Coin[]>([]);

	// const [side, setSide] = useState<string>(BUY);

	// const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	// const [loginProcess, setLoginProcess] = useState<string>(SIGNIN);
	// const [user, setUser] = useState<string>("");
	// const [asset, setAsset] = useState<Asset>({});
	// const [token, setToken] = useState<string>("");
	// const [assetLoading, setAssetLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getPrices() {
			const {data} = await getAllPrice();
			if (data.ok) {
				setCoins(data.data);
				setInit();
			} else {
				setCoins([]);
				setInit();
			}
		}
		getPrices();
	}, []);

	useEffect(() => {
		async function loginInit() {
			let key: string = localStorage.getItem(LOGIN_KEY) || "";
			const {data} = await loginByKey(key);
			if (data.ok) {
				setUser(data.data.user);
				setToken(key);
				setIsLoggedIn(true);
				setAssetLoading(true);
				const {data: assetData} = await getAsset(key);
				setAsset(assetData.data.assets);
				setAssetLoading(false);
			} else {
				setUser("");
				setToken("");
				setIsLoggedIn(false);
			}
		}
		loginInit();
	}, []);

	return (
		<FullFrame>
			<Title />
			<Container>
				<TradingTable
					init={init}
					coins={coins}
					isLoggedIn={isLoggedIn}
					token={token}
					setCoins={setCoins}
					side={side}
					setSide={setSide}
					asset={asset}
					setAsset={setAsset}
				/>
				<Account
					loginProcess={loginProcess}
					setLoginProcess={setLoginProcess}
					setIsLoggedIn={setIsLoggedIn}
					user={user}
					setUser={setUser}
					isLoggedIn={isLoggedIn}
					asset={asset}
					setToken={setToken}
					assetLoading={assetLoading}
					setAssetLoading={setAssetLoading}
					setAsset={setAsset}
				/>
			</Container>
		</FullFrame>
	);
};

const mapStateToProps = (state: MarketState) => {
	const {
		init,
		coins,
		isLoggedIn,
		token,
		side,
		asset,
		user,
		loginProcess,
		assetLoading,
	} = state;
	return {
		init,
		coins,
		isLoggedIn,
		token,
		side,
		asset,
		user,
		loginProcess,
		assetLoading,
	};
};

const mapDispatchToProps = (dispatch: MarketAction) => {
	return {
		setInit: () => dispatch(MarketAction.setInit()),
		setCoins: (coins: Coin[]) => dispatch(MarketAction.setCoins(coins)),
		setSide: (side: string) => dispatch(MarketAction.setSide(side)),
		setIsLoggedIn: (isLog: boolean) =>
			dispatch(MarketAction.setIsLoggedIn(isLog)),
		setLoginProcess: (process: string) =>
			dispatch(MarketAction.setLoginProcess(process)),
		setUser: (user: string) => dispatch(MarketAction.setUser(user)),
		setAsset: (asset: Asset) => dispatch(MarketAction.setAsset(asset)),
		setToken: (token: string) => dispatch(MarketAction.setToken(token)),
		setAssetLoading: (loading: boolean) =>
			dispatch(MarketAction.setAssetLoading(loading)),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type MainPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CoinMarket);
