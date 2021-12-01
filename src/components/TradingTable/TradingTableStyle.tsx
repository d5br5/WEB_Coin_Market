import styled from "styled-components";
import {Button} from "../../modules/styleAsset";

export const Container = styled.div`
	width: 700px;
	border: 1px solid white;
`;

export const CoinSet = styled.form`
	width: 100%;
	height: 30px;
	line-height: 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 20px 0;
`;

export const CoinName = styled.div`
	width: 10%;
	text-align: center;
`;

export const CoinPrice = styled.div`
	width: 15%;
`;

export const OrderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 40%;
`;

export const PostTrade = styled(Button)`
	display: inline-block;
	width: 45%;
	opacity: ${(props) => (props.disabled ? 0.5 : 1.0)};
`;

export const QuantityInput = styled.input`
	width: 15%;
`;

export const TableTitle = styled.div`
	font-weight: 600;
	text-align: center;
`;
export const TitleName = styled(TableTitle)`
	width: 10%;
`;
export const TitlePrice = styled(TableTitle)`
	width: 15%;
`;
export const TitleQuantity = styled(TableTitle)`
	width: 15%;
`;
export const TitleButton = styled(TableTitle)`
	width: 40%;
`;

export const Loading = styled.div`
	width: 100%;
	text-align: center;
	font-weight: 700;
	font-size: 30px;
	margin-top: 130px;
`;

export const TitleContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 50px;
	margin-bottom: 50px;
`;

export const Title = styled.div`
	width: 59%;
	text-align: center;
	font-weight: 800;
	font-size: 30px;
`;

export const SideButton = styled(Button)`
	width: 45%;
	opacity: ${(props) => (props.disabled ? 1.0 : 0.5)};
	height: 30px;
	margin-right: 10px;
`;

export const Notice = styled.div`
	margin-top: -30px;
	height: 16px;
	text-align: center;
	color: red;
`;

export const RefreshContainer = styled.div`
	display: flex;
	flex-direction: row;
	text-align: right;
	width: 100%;
	justify-content: right;
`;

export const RefreshNotice = styled.div`
	line-height: 30px;
	margin-right: 20px;
`;

export const RefreshButton = styled.input`
	border: none;
	border-radius: 3px;
	background-color: black;
	font-size: 20px;
	margin-right: 20px;
`;
