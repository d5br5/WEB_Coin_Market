import React, {useState} from "react";
import {colors, SELL, BUY} from "../../modules/asset";
import {getAllPrice, postTrade, postTradeAll} from "../../modules/API";
import {useForm} from "react-hook-form";
import {
	CoinName,
	CoinPrice,
	CoinSet,
	Container,
	Loading,
	Notice,
	OrderContainer,
	PostTrade,
	QuantityInput,
	RefreshButton,
	RefreshContainer,
	RefreshNotice,
	SideButton,
	TableTitle,
	Title,
	TitleButton,
	TitleContainer,
	TitleName,
	TitlePrice,
	TitleQuantity,
} from "./TradingTableStyle";

type Asset = {
	[key: string]: number;
};

type Coin = {code: string; price: number};

interface Iprops {
	init: boolean;
	coins: Coin[];
	side: string;
	isLoggedIn: boolean;
	setSide: React.Dispatch<React.SetStateAction<string>>;
	token: string;
	asset: Asset;
	setAsset: React.Dispatch<React.SetStateAction<Asset>>;
	setCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
}

const TradingTable = ({
	init,
	coins,
	isLoggedIn,
	side,
	setSide,
	token,
	asset,
	setAsset,
	setCoins,
}: Iprops) => {
	const {register, getValues, setValue} = useForm<any>({mode: "onChange"});
	const [trading, setTrading] = useState(false);
	const [notice, setNotice] = useState("");
	const [refreshNotice, setRefreshNotice] = useState("");

	const toggleSide = () => {
		if (side === SELL) {
			setSide(BUY);
		} else {
			setSide(SELL);
		}
	};

	const refresh = async () => {
		setRefreshNotice("Refreshing...");
		const {data} = await getAllPrice();
		if (data.ok) {
			setCoins(data.data);
		} else {
			setCoins([]);
		}
		setRefreshNotice("Refreshed!!");
	};

	const setAllZero = () => {
		const data = getValues();
		Object.keys(data).forEach((coin: string) => setValue(`${coin}`, ""));
	};

	const orderPost = async (code: string) => {
		const data = getValues();
		const quantity = parseInt(data[`${code} quantity`]);
		setTrading(true);
		setNotice("processing...");
		if (quantity > 0) {
			const postData = await postTrade(code, token, quantity, side);
			if (postData.data.ok) {
				const {
					data: {
						data: {price},
					},
				} = postData;
				const modifiedAsset: Asset = {...asset};
				if (side === SELL) {
					modifiedAsset[code] -= quantity;
					setAsset({...modifiedAsset, usd: asset.usd + price * quantity});
				} else {
					modifiedAsset[code] += quantity;
					setAsset({...modifiedAsset, usd: asset.usd - price * quantity});
				}
				setNotice("Done!");
			} else {
				const errors = Object.keys(postData.data.error);
				setNotice(postData.data.error[errors[0]]);
			}
			setAllZero();
		} else {
			setNotice("quantity must be bigger than 0");
		}
		setTrading(false);
	};

	const orderAllPost = async (code: string) => {
		setTrading(true);
		setNotice("processing...");
		const {data} = await postTradeAll(code, token, side);
		console.log(data);
		const modifiedAsset = {...asset};
		if (data.ok) {
			const {price, quantity} = data.data;
			if (side === SELL) {
				modifiedAsset[code] = 0;
				modifiedAsset["usd"] += price * quantity;
			} else {
				modifiedAsset["usd"] = 0;
				modifiedAsset[code] += quantity;
			}
			setAsset(modifiedAsset);
			setNotice("Done!");
		} else {
			const errors = Object.keys(data.error);
			setNotice(data.error[errors[0]]);
		}
		setTrading(false);
	};

	return (
		<Container>
			<TitleContainer>
				<Title>Coin Table</Title>
				<OrderContainer>
					<SideButton
						value={BUY}
						type={"button"}
						disabled={side === BUY}
						onClick={toggleSide}
						bgColor={colors.buy}
					/>
					<SideButton
						value={SELL}
						type={"button"}
						disabled={side === SELL}
						onClick={toggleSide}
						bgColor={colors.sell}
					/>
				</OrderContainer>
			</TitleContainer>
			<Notice>{notice !== "" && notice}</Notice>
			<CoinSet>
				<TitleName>Coin</TitleName>
				<TitlePrice>Price($)</TitlePrice>
				<TitleQuantity>Quantity</TitleQuantity>
				<TitleButton>Order</TitleButton>
			</CoinSet>
			{init ? (
				coins.map((coin: Coin, index: number) => (
					<CoinSet key={index}>
						<CoinName>{coin.code}</CoinName>
						<CoinPrice>{coin.price}</CoinPrice>
						<QuantityInput
							placeholder={isLoggedIn ? "quantity" : ""}
							{...register(`${coin.code} quantity`)}
							disabled={!isLoggedIn}
						/>
						<OrderContainer>
							<PostTrade
								type="button"
								value={side}
								disabled={!isLoggedIn || trading}
								onClick={() => orderPost(`${coin.code}`)}
								bgColor={side === BUY ? colors.buy : colors.sell}
							/>
							<PostTrade
								type="button"
								value={`${side} ALL`}
								disabled={!isLoggedIn || trading}
								onClick={() => orderAllPost(`${coin.code}`)}
								bgColor={side === BUY ? colors.buy : colors.sell}
							/>
						</OrderContainer>
					</CoinSet>
				))
			) : (
				<Loading>Loading,,</Loading>
			)}
			<RefreshContainer>
				<RefreshNotice>{refreshNotice}</RefreshNotice>
				<RefreshButton type={"button"} value={"🔄"} onClick={refresh} />
			</RefreshContainer>
			<RefreshContainer>
				<RefreshNotice>
					The price of coin from API doesn't change frequently. It's not a
					problem. Sorry.
				</RefreshNotice>
			</RefreshContainer>
		</Container>
	);
};

export default TradingTable;
