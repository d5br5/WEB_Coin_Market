import {Button, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {login} from "../Api";

const LOGIN_KEY = "LOGIN_KEY";
const LOGIN_NAME = "LOGIN_NAME"

const LoginForm = ({user, setUser, setIsLoggedIn}) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const {key} = await login(name, password);
            localStorage.setItem(LOGIN_NAME, name);
            localStorage.setItem(LOGIN_KEY, key);
            alert("Welcome!");
            setIsLoggedIn(true);
            setUser({LOGIN_NAME: name, LOGIN_KEY: key});
        } catch (e) {
            alert("Double Check Your ID & PW");
            setIsLoggedIn(false);
            setUser(null);
        };


    }

    const onLogOut = () => {
        localStorage.removeItem(LOGIN_KEY);
        localStorage.removeItem(LOGIN_NAME);
        setIsLoggedIn(false);
        setUser(null);
    }

    return (
        <div className="login-panel">
            {user !== null ? (
                <div className="userInfo">
                    <div className="infoTitle"><h3>USER</h3></div>
                    <div className="infoSection">
                        <div style={{marginBottom: '12px'}}>{user.LOGIN_NAME} 님</div>
                        <Button style={{width: '50%'}} variant="outlined" color="secondary" onClick={onLogOut}>
                            Logout
                        </Button>
                    </div>
                </div>
            ) : (<div className="userInfo">
                    <h3>Please Login!</h3>
                    <form className="login-form"
                          noValidate autoComplete="off"
                          onSubmit={onLogin}>
                        <TextField size="small"
                                   id="login_id"
                                   label="ID"
                                   variant="filled"
                                   onChange={e => setName(e.target.value)}/>
                        <TextField size="small"
                                   id="login_pw"
                                   label="password"
                                   variant="filled"
                                   onChange={e => setPassword(e.target.value)}
                                   type="password"/>
                        <Button type="submit"
                                variant="contained"
                                color="primary">Login</Button>
                    </form>
                </div>
            )
            }
        </div>
    )
}

export default LoginForm;