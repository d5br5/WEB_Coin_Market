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

export {Button, colors};
