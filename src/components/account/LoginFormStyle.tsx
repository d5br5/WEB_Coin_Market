import styled from "styled-components";
import {Button} from "../../modules/asset";

export const Container = styled.form``;

export const ButtonContainer = styled.div`
	width: 90%;
	margin: 0 auto 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 160px;
`;

export const AccountInput = styled.input`
	height: 30px;
	width: 100%;
	margin: 5px;
`;

export const InputInfo = styled.div`
	width: 100px;
`;

export const InputItem = styled.div`
	display: flex;
	flex-direction: row;
	width: 90%;
	align-items: center;
	margin: 0 auto;
`;

export const AccountButton = styled(Button)<{transparent: boolean}>`
	margin: 10px auto 30px;
	width: 40%;
	background-color: ${(props) => props.bgColor};
	opacity: ${(props) => (props.transparent ? 0.5 : 1)};
`;

export const LoginNotice = styled.div`
	text-align: center;
	margin-top: 20px;
`;
