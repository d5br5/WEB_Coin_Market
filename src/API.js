import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// const defaultURL = "https://coin-market-d5br5.herokuapp.com";
const defaultURL = "http://localhost:4000";
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

export const get = async (url = "", query = {}, extraHeaders = {}) => {
    const res = await fetch(`${defaultURL}/${url}`, {
        method: "GET",
        headers: {...getDefaultHeaders(), ...extraHeaders},
    });
    return await res.json();
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


