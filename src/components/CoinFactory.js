import Banner from './Banner';
import MarketSelector from './MarketSelector';
import PostOrder from './PostOrder';
import IncompleteOrders from './IncompleteOrders';
import LoginForm from './LoginForm';
import Assets from "./Assets";

import React, {useEffect, useState} from 'react';
import {getOrders, loadAssets, loadMarket, loadMarkets} from '../Api';
import OrderBooksTable from './OrderBooksTable';


const CoinFactory = ({user, setUser, isLoggedIn, setIsLoggedIn}) => {

    const defaultMarket = 'snu-won';
    const defaultSide = 'buy';

    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    const [marketName, setMarketName] = useState(defaultMarket);
    const [side, setSide] = useState(defaultSide);
    const [orders, setOrders] = useState([]);
    const [assets, setAssets] = useState([]);

    const [refresh, setRefresh] = useState(true);

    const refreshToggle = () => {
        if (refresh) {
            setRefresh(false);
        } else {
            setRefresh(true)
        }
    }

    useEffect(() => {
        loadMarkets()
            .then(marketObjs => {
                setMarkets(Object.keys(marketObjs).map(key => marketObjs[key]));
            })
    }, []);

    useEffect(() => {
        loadMarket(marketName)
            .then(_market => setMarket(_market));
        if (isLoggedIn) {
            getOrders().then(order => {
                setOrders(order)
            });
        }
    }, [user, marketName, side, isLoggedIn, refresh]);

    useEffect(() => {
        const interval = setInterval(() => {
            loadMarket(marketName)
                .then(_market => setMarket(_market));
            if (isLoggedIn) {
                getOrders().then(order => {
                    setOrders(order)
                });
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isLoggedIn, marketName]);

    useEffect(() => {
        const interval = setInterval(() => {
            isLoggedIn && loadAssets().then(_assets => {
                setAssets(_assets);
            })
        }, 5000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        isLoggedIn && loadAssets().then(_assets => {
            setAssets(_assets);
        })
    }, [isLoggedIn]);


    return <div>
        <Banner/>
        <MarketSelector markets={markets} marketName={marketName} setMarketName={setMarketName}/>
        <div className='section'>
            {
                (market && assets) && <>
                    <OrderBooksTable market={market}/>
                    <div className='postAndDeleteOrder'>
                        <PostOrder isLoggedIn={isLoggedIn} marketName={marketName} refreshToggle={refreshToggle}
                                   side={side} setSide={setSide} setOrders={setOrders} assets={assets}/>
                        <IncompleteOrders isLoggedIn={isLoggedIn} marketName={marketName}
                                          orders={orders} setOrders={setOrders} refreshToggle={refreshToggle}/>
                    </div>
                </>
            }
            <div className='info'>
                <LoginForm user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
                {(isLoggedIn && assets) && <Assets assets={assets}/>}
            </div>
        </div>
    </div>
}

export default CoinFactory