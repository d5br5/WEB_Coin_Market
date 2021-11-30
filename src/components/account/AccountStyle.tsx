import styled from "styled-components";
import {Button} from "../../modules/asset";

export const Container = styled.div`
	width: 400px;
	border: 1px solid white;
`;

export const Notice = styled.div`
	text-align: center;
	width: 100%;
	margin-bottom: 10px;
	height: 20px;
`;

export const AccountTitle = styled.div`
	text-align: center;
	margin-top: 50px;
	font-weight: 800;
	font-size: 30px;
	margin-bottom: 30px;
`;

export const LoggedInForm = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: -20px;
`;

export const Welcome = styled.div`
	text-align: center;
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 10px;
`;

export const AssetContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 50%;
	margin: 0px auto 20px;
`;

export const Asset = styled.div`
	width: 100%;
	display: flex;
	margin: 5px 0;
	flex-direction: row;
	justify-content: space-around;
	font-size: 18px;
`;

export const AssetName = styled.div`
	width: 30%;
	text-align: center;
	font-weight: 600;
`;

export const AssetQuantity = styled.div`
	width: 60%;
`;

export const LogOutButton = styled(Button)<{transparent: boolean}>`
	margin: 10px auto 30px;
	width: 40%;
	background-color: ${(props) => props.bgColor};
	opacity: ${(props) => (props.transparent ? 0.5 : 1)};
`;
