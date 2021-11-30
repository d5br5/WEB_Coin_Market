import React, {useState} from "react";
import LoginForm from "./LoginForm";
import {LOGIN_KEY} from "../../modules/asset";
import {
	Container,
	AccountTitle,
	Asset,
	AssetContainer,
	AssetName,
	AssetQuantity,
	LogOutButton,
	LoggedInForm,
	Notice,
	Welcome,
} from "./AccountStyle";

type AssetType = {[key: string]: number};

interface IProps {
	loginProcess: string;
	setLoginProcess: (process: string) => any;
	isLoggedIn: boolean;
	setIsLoggedIn: (isLog: boolean) => any;
	user: string;
	setUser: (user: string) => any;
	asset: AssetType;
	setAsset: (asset: Asset) => any;
	setToken: (token: string) => any;
	assetLoading: boolean;
	setAssetLoading: (loading: boolean) => any;
}

const Account = ({
	loginProcess,
	setLoginProcess,
	isLoggedIn,
	setIsLoggedIn,
	user,
	setUser,
	setAsset,
	asset,
	setToken,
	assetLoading,
	setAssetLoading,
}: IProps) => {
	const [notice, setNotice] = useState<string>(" ");

	return (
		<Container>
			<AccountTitle>Account</AccountTitle>
			<Notice>{notice}</Notice>
			{isLoggedIn ? (
				<LoggedInForm>
					<Welcome>Hello, {user}</Welcome>
					<LogOutButton
						type={"submit"}
						value={"Log Out"}
						bgColor={"red"}
						transparent={assetLoading}
						disabled={assetLoading}
						onClick={() => {
							localStorage.removeItem(LOGIN_KEY);
							setToken("");
							setIsLoggedIn(false);
							setUser("");
							setAsset({});
						}}
					/>
					<Welcome>Your Assets</Welcome>
					{assetLoading ? (
						<Notice> Now Asset is Loading,,,</Notice>
					) : (
						<AssetContainer>
							{Object.keys(asset).map((coin, index) => (
								<Asset key={index}>
									<AssetName>{coin}</AssetName>
									<AssetQuantity>{asset[coin]}</AssetQuantity>
								</Asset>
							))}
						</AssetContainer>
					)}
				</LoggedInForm>
			) : (
				<LoginForm
					setIsLoggedIn={setIsLoggedIn}
					setUser={setUser}
					setNotice={setNotice}
					loginProcess={loginProcess}
					setToken={setToken}
					setLoginProcess={setLoginProcess}
					setAsset={setAsset}
					setAssetLoading={setAssetLoading}
				/>
			)}
		</Container>
	);
};

export default Account;
