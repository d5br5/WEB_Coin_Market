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
	setLoginProcess: React.Dispatch<React.SetStateAction<string>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: string;
	setUser: React.Dispatch<React.SetStateAction<string>>;
	asset: AssetType;
	setAsset: React.Dispatch<React.SetStateAction<AssetType>>;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	assetLoading: boolean;
	setAssetLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
