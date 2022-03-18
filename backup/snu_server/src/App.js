import React, {useEffect, useState} from 'react';
import {loginByKey} from './Api';
import CoinFactory from './components/CoinFactory';

function App() {

    const LOGIN_KEY = 'LOGIN_KEY';
    const LOGIN_NAME = 'LOGIN_NAME';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [init, setInit] = useState(false);

    useEffect(() => {
        const lsKey = localStorage.getItem(LOGIN_KEY);
        if (lsKey === null) {
            setUser(null);
            setIsLoggedIn(false);
        } else {
            try {
                async function keyLogin() {
                    const {name} = await loginByKey(lsKey);
                    if (name) {
                        localStorage.setItem(LOGIN_NAME, name);
                        setIsLoggedIn(true);
                        setUser({LOGIN_NAME: name, LOGIN_KEY: lsKey});
                    }
                }

                keyLogin();
            } catch (e) {
                localStorage.removeItem(LOGIN_KEY);
                setIsLoggedIn(false);
                setUser(null);
            }
        }
        setInit(true);
    }, []);

    return (
        <div className='App'>
            {init ? <CoinFactory isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
                                 user={user} setUser={setUser}/> : 'initializing....'}
        </div>
    );
};

export default App;
