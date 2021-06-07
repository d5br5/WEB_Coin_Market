import React, {useEffect, useState} from "react";
import {loadMarkets, loadMarket, login, loginByKey} from "./Api";
import {Button, ButtonGroup, TextField} from "@material-ui/core";
import Assets from "./Assets";


function App() {

    const LOGIN_KEY = "LOGIN_KEY";
    const LOGIN_USER = "LOGIN_USER"

    const defaultMarket = "snu-won";
    const defaultTrade = "sell";

    const [user, setUser] = useState({user_name: "", user_key: ""});
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    const [marketName, setMarketName] = useState(defaultMarket);
    const [tradeStatus, setTradeStatus] = useState(defaultTrade);

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [loginMethod, setLoginMethod] = useState('normal');

    const [error, setError] = useState("");

    const onNormalLogin = async (e) => {
        e.preventDefault();
        const {key} = await login(name, password);
        if (key) {
            localStorage.setItem(LOGIN_USER, name);
            localStorage.setItem(LOGIN_KEY, key);
            setUser({user_name: name, user_key: key});
        } else {
            return;
        }
    }

    const onKeyLogin = async (e) => {
        e.preventDefault();
        try {
            const {name} = await loginByKey(key);
        } catch (e) {
            console.log(e);
        }

        if (name) {
            localStorage.setItem(LOGIN_USER, name);
            localStorage.setItem(LOGIN_KEY, key);
            setUser({user_name: name, user_key: key});
        } else {
            return;
        }
    }
    const onLogOut = () => {
        localStorage.removeItem("LOGIN_KEY");
        setUser(null);
    }
    const LoginMethodChange = (e) => {
        e.preventDefault();
        if (loginMethod === 'normal') {
            setLoginMethod('key');
        } else {
            setLoginMethod('normal');
        }
    }

    const onOrderSubmit = (e) => {
        e.preventDefault();
        console.log(price);
        console.log(quantity);
    }


    useEffect(() => {
        setUser({LOGIN_USER: localStorage.getItem(LOGIN_USER), LOGIN_KEY: localStorage.getItem(LOGIN_KEY)});
        loadMarkets()
            .then(marketObjs => {
                setMarkets(Object.keys(marketObjs).map(key => marketObjs[key]));
            });
    }, []);

    useEffect(() => {
        loadMarket(marketName)
            .then(_market => setMarket(_market))
    }, [marketName]);


    return (
        <div className="App">
            <h1>SNU-COIN</h1>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                {markets.map((market, index) =>
                    <Button key={index} onClick={() => setMarketName(market.name)}>{market.name}</Button>
                )}
            </ButtonGroup>
            <div className="section">
                {market &&
                <div className="contents">

                    <div className="market">
                        <div>{market.market.name}</div>
                        <div>{tradeStatus}</div>
                        <div id="orderBooks">
                            {
                                tradeStatus === "buy" ?
                                    (
                                        market.orderBook.buy.map(orderBook => {
                                            return (<div key={orderBook._id}>
                                                [id] {orderBook._id} - [Quantity] {orderBook.totalQuantity} :
                                                [price] {orderBook.price}
                                            </div>);
                                        })
                                    ) : (
                                        market.orderBook.sell.map(orderBook => {
                                                return (<div key={orderBook._id}>
                                                    [id] {orderBook._id} - [Quantity] {orderBook.totalQuantity} :
                                                    [price] {orderBook.price}
                                                </div>);
                                            }
                                        )
                                    )
                            }
                        </div>

                        <form className="create-order" onSubmit={onOrderSubmit}>
                            <ButtonGroup variant="contained" color="primary"
                                         aria-label="contained primary button group">
                                <Button style={{width: 150}} onClick={() => setTradeStatus('buy')}>Buy</Button>
                                <Button style={{width: 150}} onClick={() => setTradeStatus('sell')}>Sell</Button>
                            </ButtonGroup>

                            <TextField size="small" id="filled-basic" label="price"
                                       onChange={e => setPrice(e.target.value)} variant="filled" type="number"/>
                            <TextField size="small" id="filled-basic" label="quantity"
                                       onChange={e => setQuantity(e.target.value)} variant="filled"
                                       type="number"/>
                            <Button type="submit" variant="contained" color="secondary">Submit</Button>
                        </form>

                    </div>
                </div>}

                <div className="login-panel">
                    {user ?
                        (
                            <div>
                                <span>Welcome! {user.name}</span>
                                <button onClick={onLogOut}>Logout</button>
                                <Assets/>
                            </div>
                        ) : (<div>
                                <div>
                                    <h3>Please Login!</h3>
                                    {
                                        loginMethod === 'normal' ? (
                                            <form className="login-form" noValidate autoComplete="off"
                                                  onSubmit={onNormalLogin}>
                                                <TextField size="small" id="filled-basic" label="ID" variant="filled"
                                                           onChange={e => setName(e.target.value)}/>
                                                <TextField size="small" id="filled-basic" label="password"
                                                           variant="filled"
                                                           onChange={e => setPassword(e.target.value)}
                                                           type="password"/>
                                                <Button variant="contained" color="primary" onClick={LoginMethodChange}>Method
                                                    Change</Button>
                                                <Button type="submit" variant="contained" color="primary">Normal
                                                    Login</Button>
                                            </form>
                                        ) : (
                                            <form className="login-form" noValidate autoComplete="off"
                                                  onSubmit={onKeyLogin}>
                                                <TextField size="small" id="filled-basic" label="Key" variant="filled"
                                                           onChange={e => setKey(e.target.value)}/>
                                                <Button variant="contained" color="primary" onClick={LoginMethodChange}>Method
                                                    Change</Button>
                                                <Button type="submit" variant="contained" color="primary">Key
                                                    Login</Button>
                                            </form>
                                        )
                                    }

                                </div>
                                <Assets/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
