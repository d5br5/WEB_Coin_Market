import styled from "styled-components";

const Button = styled.input<{bgColor: string}>`
	border: none;
	border-radius: 3px;
	background-color: ${(props) => props.bgColor};
	color: white;
	text-align: center;
	padding: 8px 0;
	font-weight: 600;
`;

const colors = {
	buy: "dodgerblue",
	sell: "tomato",
};

export const LOGIN_KEY = "LOGIN_KEY";
export const BUY = "BUY";
export const SELL = "SELL";
export const SIGNIN = "Sign In";
export const SIGNUP = "Sign Up";

export {Button, colors};
