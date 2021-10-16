import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getAllPrice, getAsset, loginByKey} from "../API";
import {LOGIN_KEY, SELL, SIGNIN} from "./asset";
import TradingTable from "./table/TradingTable";
import Account from "./account/Account";
import Title from "./Title";

const FullFrame = styled.div`
  padding-top: 90px;
`

const Container = styled.div`
  width: 1200px;
  height: 600px;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CoinMarket = () => {

    const [init, setInit] = useState(false);
    const [coins, setCoins] = useState({});
    const [side, setSide] = useState(SELL);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginProcess, setLoginProcess] = useState(SIGNIN);
    const [user, setUser] = useState("");
    const [asset, setAsset] = useState({});
    const [token, setToken] = useState("");
    const [assetLoading, setAssetLoading] = useState(true);

    useEffect(() => {
        async function getPrices() {
            const {data} = await getAllPrice();
            if (data.ok) {
                setCoins(data.data);
                setInit(true)
            } else {
                setCoins({});
                setInit(true);
            }
        }

        getPrices();
    }, []);

    useEffect(() => {
        async function loginInit() {
            const key = localStorage.getItem(LOGIN_KEY);
            const {data} = await loginByKey(key);
            if (data.ok) {
                setUser(data.data.user);
                setToken(key);
                setIsLoggedIn(true);
                setAssetLoading(true);
                const {data: assetData} = await getAsset(key);
                setAsset(assetData.data.assets);
                setAssetLoading(false);
            } else {
                setUser("");
                setToken("");
                setIsLoggedIn(false);
            }
        }

        loginInit();
    }, [])

    return (
        <FullFrame>
            <Title/>
            <Container>
                <TradingTable init={init} coins={coins}
                              isLoggedIn={isLoggedIn} token={token} setCoins={setCoins}
                              side={side} setSide={setSide} asset={asset} setAsset={setAsset}/>
                <Account loginProcess={loginProcess}
                         setLoginProcess={setLoginProcess}
                         setIsLoggedIn={setIsLoggedIn}
                         user={user}
                         setUser={setUser}
                         isLoggedIn={isLoggedIn}
                         asset={asset}
                         setToken={setToken}
                         assetLoading={assetLoading}
                         setAssetLoading={setAssetLoading}
                         setAsset={setAsset}/>
            </Container>
        </FullFrame>
    );
};

export default CoinMarket;
