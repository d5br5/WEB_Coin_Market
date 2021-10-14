import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getAllPrice} from "../API";
import {SELL, SIGNIN} from "./Asset";
import TradingTable from "./TradingTable";
import Account from "./Account";

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

    useEffect(() => {
        async function getPrices() {
            const data = await getAllPrice();
            if (data.ok) {
                setCoins(data.data);
                setInit(true)
            } else {
                setCoins([]);
                setInit(true);
            }
        }

        getPrices();
    }, [])

    return (
        <Container>
            <TradingTable init={init} coins={coins}
                          isLoggedIn={isLoggedIn}
                          side={side} setSide={setSide}/>
            <Account loginProcess={loginProcess}
                     setLoginProcess={setLoginProcess}
                     setIsLoggedIn={setIsLoggedIn}
                     user={user}
                     setUser={setUser}
                     isLoggedIn={isLoggedIn}/>
        </Container>
    );
};

export default CoinMarket;
