import React, {useState} from "react";
import LoginForm from "../LoginForm/LoginForm";
import {LOGIN_KEY} from "../../modules/constants";
import * as A from "./AccountStyle";

interface IProps {
	loginProcess: string;
	setLoginProcess: React.Dispatch<React.SetStateAction<string>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: string;
	setUser: React.Dispatch<React.SetStateAction<string>>;
	asset: Asset;
	setAsset: React.Dispatch<React.SetStateAction<Asset>>;
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
		<A.Container>
			<A.AccountTitle>Account</A.AccountTitle>
			<A.Notice>{notice}</A.Notice>
			{isLoggedIn ? (
				<A.LoggedInForm>
					<A.Welcome>Hello, {user}</A.Welcome>
					<A.LogOutButton
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
					<A.Welcome>Your Assets</A.Welcome>
					{assetLoading ? (
						<A.Notice> Now Asset is Loading,,,</A.Notice>
					) : (
						<A.AssetContainer>
							{Object.keys(asset).map((coin, index) => (
								<A.Asset key={index}>
									<A.AssetName>{coin}</A.AssetName>
									<A.AssetQuantity>{asset[coin]}</A.AssetQuantity>
								</A.Asset>
							))}
						</A.AssetContainer>
					)}
				</A.LoggedInForm>
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
		</A.Container>
	);
};

export default Account;
