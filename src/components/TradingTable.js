import React from "react";
import styled from "styled-components";
import {Button, colors, SELL, BUY} from "./Asset";

const Container = styled.div`
  width: 700px;
  border: 1px solid black;
`;

const CoinSet = styled.form`
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
`;

const CoinName = styled.div`
  width: 10%;
  text-align: center;
`;

const CoinPrice = styled.div`
  width: 15%;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 40%;
`;

const PostTrade = styled(Button)`
  display: inline-block;
  width: 45%;
  opacity: ${props => props.disabled ? 0.5 : 1.0};
`

const QuantityInput = styled.input`
  width: 15%;
`

const TableTitle = styled.div`
  font-weight: 600;
  text-align: center;
`;
const TitleName = styled(TableTitle)`
  width: 10%;
`;
const TitlePrice = styled(TableTitle)`
  width: 15%
`;
const TitleQuantity = styled(TableTitle)`
  width: 15%
`;
const TitleButton = styled(TableTitle)`
  width: 40%
`;


const Loading = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 30px;
  margin-top: 130px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`

const Title = styled.div`
  width: 59%;
  text-align: center;
  font-weight: 800;
  font-size: 30px;
  
`;

const SideButton = styled(Button)`
  width: 45%;
  opacity: ${props => props.disabled ? 1.0 : 0.5};
  height: 30px;
  margin-right: 10px;
`



const TradingTable = ({init, coins, isLoggedIn, side, setSide}) => {

    const toggleSide = () => {
        if (side === SELL) {
            setSide(BUY);
        } else {
            setSide(SELL);
        }
    }

    return (
        <Container>
            <TitleContainer>
                <Title>Coin Table</Title>
                <OrderContainer>
                    <SideButton value={BUY} type={"button"} disabled={side === BUY} onClick={toggleSide}
                                bgColor={colors.buy}/>
                    <SideButton value={SELL} type={"button"} disabled={side === SELL} onClick={toggleSide}
                                bgColor={colors.sell}/>
                </OrderContainer>
            </TitleContainer>
            <CoinSet>
                <TitleName>Coin</TitleName>
                <TitlePrice>Price($)</TitlePrice>
                <TitleQuantity>Quantity</TitleQuantity>
                <TitleButton>Order</TitleButton>
            </CoinSet>
            {init ? (
                coins.map((coin, index) => <CoinSet key={index}>
                    <CoinName>{coin.code}</CoinName>
                    <CoinPrice>{coin.price}</CoinPrice>
                    <QuantityInput placeholder={isLoggedIn ? "quantity" : ""} disabled={!isLoggedIn}/>
                    <OrderContainer>
                        <PostTrade type="submit" value={side} disabled={!isLoggedIn}
                                   bgColor={side === BUY ? colors.buy : colors.sell}/>
                        <PostTrade type="submit" value={side + " ALL"} disabled={!isLoggedIn}
                                   bgColor={side === BUY ? colors.buy : colors.sell}/>
                    </OrderContainer>
                </CoinSet>)
            ) : (
                <Loading>Loading,,</Loading>
            )}
        </Container>
    )

}

export default TradingTable;