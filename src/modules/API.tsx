import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const defaultURL: string = "https://coin-market-d5br5.herokuapp.com";
const LOGIN_KEY: string = "LOGIN_KEY";

interface defaultHeadersType {
	"Content-Type": string;
	Authorization: string;
}

const getDefaultHeaders = () => {
	const defaultHeaders: defaultHeadersType = {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: "",
	};
	if (localStorage.getItem(LOGIN_KEY)) {
		defaultHeaders.Authorization = `Bearer ${localStorage.getItem(LOGIN_KEY)}`;
	}
	return defaultHeaders;
};

export const get = async (url = "", extraHeaders = {}) => {
	const data = await axios({
		method: "GET",
		url: `${defaultURL}/${url}`,
		headers: {...getDefaultHeaders(), ...extraHeaders},
	});
	return data;
};

const post = async (url: string, body = {}, extraHeaders = {}) => {
	const data = await axios({
		method: "POST",
		url: `${defaultURL}/${url}`,
		data: new URLSearchParams(body).toString(),
		headers: {...getDefaultHeaders(), ...extraHeaders},
	});
	return data;
};

export const login = async (email: string, password: string) => {
	return await post("login", {email, password});
};

export const loginByKey = async (key: string) => {
	return await post("login/key", {key});
};

export const signup = async (name: string, email: string, password: string) => {
	return await post("register", {name, email, password});
};

export const getAllPrice = async () => {
	return await get("coins");
};

export const getAsset = async (token: string) => {
	return await get("assets", {Authorization: `Bearer ${token}`});
};

export const postTrade = async (
	coin: string,
	token: string,
	quantity: number,
	side: string
) => {
	return await post(
		`trade/${side.toLowerCase()}/${coin}`,
		{quantity},
		{Authorization: `Bearer ${token}`}
	);
};

export const postTradeAll = async (
	coin: string,
	token: string,
	side: string
) => {
	return await post(`trade/${side.toLowerCase()}/${coin}/all`, {
		Authorization: `Bearer ${token}`,
	});
};
