import React, {useState} from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import {useForm} from "react-hook-form";

const Container = styled.div`
  width: 400px;
  border: 1px solid black;
`

const Notice = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  height: 20px;
`

const AccountTitle = styled.div`
  text-align: center;
  margin-top: 50px;
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 30px;
`;

const LoggedInForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
`;

const Welcome = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin: 20px auto;
`;

const Asset = styled.div`
  width: 100%;
  display: flex;
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-around;
  font-size: 18px;
`;

const AssetName = styled.div`
  width: 30%;
  text-align: center;
  font-weight: 600;
`

const AssetQuantity = styled.div`
  width: 60%;
`



const Account = ({loginProcess, setLoginProcess, isLoggedIn, setIsLoggedIn, user, setUser, setAsset, asset, setToken}) => {

    const [notice, setNotice] = useState(" ");

    return <Container>
        <AccountTitle>Account</AccountTitle>
        <Notice>{notice}</Notice>
        {isLoggedIn ?
            <LoggedInForm>
                <Welcome>Hello, {user}</Welcome>
                <Welcome>Your Assets</Welcome>
                <AssetContainer>
                    {Object.keys(asset).map((coin, index) => <Asset key={index}>
                        <AssetName>{coin}</AssetName>
                        <AssetQuantity>{asset[coin]}</AssetQuantity>
                    </Asset>)}
                </AssetContainer>
            </LoggedInForm>
            :
            <LoginForm setIsLoggedIn={setIsLoggedIn}
                       setUser={setUser} setNotice={setNotice}
                       loginProcess={loginProcess} setToken={setToken}
                       setLoginProcess={setLoginProcess} setAsset={setAsset}/>}

    </Container>
}

export default Account;