import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const defaultURL = "https://coin-market-d5br5.herokuapp.com";
// const defaultURL = "http://localhost:4000";
const LOGIN_KEY = "LOGIN_KEY";

const getDefaultHeaders = () => {
    const defaultHeaders = {"Content-Type": "application/x-www-form-urlencoded"};
    if (localStorage.getItem(LOGIN_KEY)) {
        defaultHeaders["Authorization"] = `Bearer ${localStorage.getItem(
            LOGIN_KEY
        )}`;
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

const post = async (url, body = {}, extraHeaders = {}) => {
    const data = await axios({
        method: "POST",
        url: `${defaultURL}/${url}`,
        data: new URLSearchParams(body).toString(),
        headers: {...getDefaultHeaders(), ...extraHeaders},
    });
    return data;
};

export const login = async (email, password) => {
    return await post("login", {email, password});
};

export const loginByKey = async (key) => {
    return await post("login/key", {key});
};

export const signup = async (name, email, password) => {
    return await post("register", {name, email, password});
}

export const getAllPrice = async () => {
    return await get("coins")
}

export const getAsset = async (token) => {
    return await get("assets", {Authorization: `Bearer ${token}`})
}

export const postTrade = async (coin, token, quantity, side) => {
    return await post(`trade/${side.toLowerCase()}/${coin}`, {quantity}, {Authorization: `Bearer ${token}`});
}

export const postTradeAll = async (coin, token, side) => {
    return await post(`trade/${side.toLowerCase()}/${coin}/all`, {Authorization: `Bearer ${token}`});
}
