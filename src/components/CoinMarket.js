import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getAllPrice} from "../API";
import {SELL, SIGNIN} from "./asset";
import TradingTable from "./table/TradingTable";
import Account from "./account/Account";

const Container = styled.div`
  width: 1200px;
  height: 500px;
  margin: 200px auto;
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

    useEffect(() => {
        async function getPrices() {
            const {data} = await getAllPrice();
            console.log(data);
            if (data.ok) {
                setCoins(data.data);
                setInit(true)
            } else {
                setCoins({});
                setInit(true);
            }
        }

        getPrices();
    }, [])

    return (
        <Container>
            <TradingTable init={init} coins={coins}
                          isLoggedIn={isLoggedIn} token={token}
                          side={side} setSide={setSide} asset={asset}/>
            <Account loginProcess={loginProcess}
                     setLoginProcess={setLoginProcess}
                     setIsLoggedIn={setIsLoggedIn}
                     user={user}
                     setUser={setUser}
                     isLoggedIn={isLoggedIn}
                     asset={asset}
                     setToken={setToken}
                     setAsset={setAsset}/>
        </Container>
    );
};

export default CoinMarket;
