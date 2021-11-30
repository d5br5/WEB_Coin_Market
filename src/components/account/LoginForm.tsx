import React from "react";
import {LOGIN_KEY, SIGNIN, SIGNUP} from "../../modules/asset";
import {useForm} from "react-hook-form";
import {login, signup, getAsset} from "../../modules/API";
import {
	AccountButton,
	AccountInput,
	ButtonContainer,
	Container,
	InputContainer,
	InputInfo,
	InputItem,
	LoginNotice,
} from "./LoginFormStyle";

type Asset = {[key: string]: number};

interface IProps {
	loginProcess: string;
	setLoginProcess: React.Dispatch<React.SetStateAction<string>>;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setUser: React.Dispatch<React.SetStateAction<string>>;
	setAsset: React.Dispatch<React.SetStateAction<Asset>>;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setNotice: React.Dispatch<React.SetStateAction<string>>;
	setAssetLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({
	loginProcess,
	setLoginProcess,
	setIsLoggedIn,
	setNotice,
	setUser,
	setAsset,
	setToken,
	setAssetLoading,
}: IProps) => {
	const {register, setValue, getValues} = useForm<any>({mode: "onChange"});
	type loginData = {
		ok: boolean;
		data?: {data: {token: string}; user: string; token: string};
		error?: {[key: string]: string};
	};
	const onLoginClick = async (event: any) => {
		event.preventDefault();
		setNotice("Login Processing...");
		const {email, password} = getValues();
		let data: loginData;
		const {data: loginResult} = await login(email, password);
		data = loginResult || {ok: false, data: {token: ""}, user: "", token: ""};
		if (data.ok) {
			const token = data?.data?.token || "";
			const {
				data: {
					data: {assets},
				},
			} = await getAsset(token);
			setAsset(assets);
			localStorage.setItem(LOGIN_KEY, token);
			setToken(token);
			setIsLoggedIn(true);
			setUser(data?.data?.user || "");
			setAssetLoading(false);
			setNotice("");
		} else {
			setNotice("Login failed. Try again");
			localStorage.removeItem(LOGIN_KEY);
			setIsLoggedIn(false);
			setUser("");
		}
	};

	const onRegisterClick = async (event: any) => {
		event.preventDefault();
		setNotice("Register Processing..");
		const {name, email, password} = getValues();
		const {data} = await signup(name, email, password);
		if (data.ok) {
			setNotice("Account Created! Login Plz");
			setValue("name", "");
			setValue("password", "");
			setLoginProcess(SIGNIN);
		} else {
			setNotice(`${data?.error?.param} ${data?.error?.msg}`);
			setValue("name", "");
			setValue("password", "");
			setValue("email", "");
		}
	};

	return (
		<Container>
			<InputContainer>
				{loginProcess === SIGNUP && (
					<InputItem>
						<InputInfo>Name</InputInfo>
						<AccountInput
							placeholder="name"
							type="text"
							onFocus={() => setNotice("")}
							autoComplete={"username"}
							{...register("name", {
								required: "Enter your name,",
								minLength: {value: 2, message: "Name must be longer than 2"},
							})}
						/>
					</InputItem>
				)}
				<InputItem>
					<InputInfo>Email</InputInfo>
					<AccountInput
						placeholder="email"
						type="text"
						autoComplete={"email"}
						onFocus={() => setNotice("")}
						{...register("email", {
							required: "Enter your E-mail.",
							minLength: {value: 10, message: "E-mail must be longer than 10"},
						})}
					/>
				</InputItem>
				<InputItem>
					<InputInfo>Password</InputInfo>
					<AccountInput
						placeholder="password"
						type="password"
						autoComplete={"current-password"}
						onFocus={() => setNotice("")}
						{...register("password", {
							required: "Enter your password",
							minLength: {value: 6, message: "Password must be longer than 6"},
						})}
					/>
				</InputItem>
			</InputContainer>
			<ButtonContainer>
				<AccountButton
					value={loginProcess === SIGNIN ? "Sign In" : "Go Sign In"}
					type={"submit"}
					bgColor={"blue"}
					transparent={loginProcess !== SIGNIN}
					onClick={
						loginProcess === SIGNIN
							? onLoginClick
							: (event: any) => {
									event.preventDefault();
									setLoginProcess(SIGNIN);
							  }
					}
				/>

				<AccountButton
					value={loginProcess === SIGNUP ? "Sign Up" : "Go Sign Up"}
					type={"submit"}
					bgColor={"blue"}
					transparent={loginProcess !== SIGNUP}
					onClick={
						loginProcess === SIGNUP
							? onRegisterClick
							: (event: any) => {
									event.preventDefault();
									setLoginProcess(SIGNUP);
							  }
					}
				/>
			</ButtonContainer>
			<LoginNotice>Length of name should be 2~12</LoginNotice>
			<LoginNotice>Length of password should be 9~16</LoginNotice>
		</Container>
	);
};
export default LoginForm;
