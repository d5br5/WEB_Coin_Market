import React, {useState} from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {Button, SIGNIN, SIGNUP, LOGIN_KEY} from "./Asset";
import {signup, login} from "../API";

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

const LoginForm = styled.form`

`;


const AccountButton = styled(Button)`
  width: 40%;
  background-color: ${props => props.bgColor};
  opacity: ${props => props.transparent ? 0.5 : 1};
`
const AccountTitle = styled.div`
  text-align: center;
  margin-top: 50px;
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 160px;
`

const AccountInput = styled.input`
  height: 30px;
  width: 100%;
  margin: 5px;
`;

const InputInfo = styled.div`
  width: 100px;
`;
const InputItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  align-items: center;
  margin: 0 auto;
`;

const Account = ({loginProcess, setLoginProcess, isLoggedIn, setIsLoggedIn, user, setUser}) => {

    const [notice, setNotice] = useState(" ");
    const {register, setValue, getValues} = useForm({mode: "onChange"})

    const onLoginClick = async (e) => {
        e.preventDefault();
        const {email, password} = getValues();
        const {data} = await login(email, password);
        console.log(data);
        if (data.ok) {
            localStorage.setItem(LOGIN_KEY, data.token);
            setIsLoggedIn(true);
            setUser(data.data.user);
        }
    }

    const onRegisterClick = async (e) => {
        e.preventDefault();
        const {name, email, password} = getValues();
        const {data} = await signup(name, email, password);
        if (data.ok) {
            setNotice("Account Created! Login Plz");
        } else {
            setNotice(data?.error?.param + data?.error?.msg);
            setValue('name', '');
            setValue('password', '');
            setValue('email', '');
        }
        console.log(data);
    }

    return <Container>
        <AccountTitle>Account</AccountTitle>
        <Notice>{notice}</Notice>
        {isLoggedIn ? <>{user} is logged in</> : <LoginForm>
            <InputContainer>
                {loginProcess === SIGNUP && <InputItem>
                    <InputInfo>Name</InputInfo>
                    <AccountInput placeholder="name" type="text"
                                  onFocus={() => setNotice("")}
                                  autoComplete={"username"}
                                  {...register("name", {
                                      required: "Enter your name,",
                                      minLength: {value: 2, message: "Name must be longer than 2"}
                                  })}/>
                </InputItem>}
                <InputItem>
                    <InputInfo>Email</InputInfo>
                    <AccountInput placeholder="email" type="text"
                                  autoComplete={"email"}
                                  onFocus={() => setNotice("")}
                                  {...register("email", {
                                      required: "Enter your E-mail.",
                                      minLength: {value: 10, message: "E-mail must be longer than 10"}
                                  })}/>
                </InputItem>
                <InputItem>
                    <InputInfo>Password</InputInfo>
                    <AccountInput placeholder="password" type="password"
                                  autoComplete={"current-password"}
                                  onFocus={() => setNotice("")}
                                  {...register("password", {
                                      required: "Enter your password",
                                      minLength: {value: 6, message: "Password must be longer than 6"}
                                  })}/>
                </InputItem>
            </InputContainer>
            <ButtonContainer>
                <AccountButton type={"submit"}
                               value={loginProcess === SIGNIN ? "Sign In" : "Go Sign In"}
                               bgColor={"blue"} transparent={loginProcess !== SIGNIN}
                               onClick={loginProcess === SIGNIN ? onLoginClick : (e) => {
                                   e.preventDefault();
                                   setLoginProcess(SIGNIN)
                               }}/>
                <AccountButton type={"submit"}
                               value={loginProcess === SIGNUP ? "Sign Up" : "Go Sign Up"}
                               bgColor={"blue"} transparent={loginProcess !== SIGNUP}
                               onClick={loginProcess === SIGNUP ? onRegisterClick : (e) => {
                                   e.preventDefault();
                                   setLoginProcess(SIGNUP)
                               }}/>
            </ButtonContainer>
        </LoginForm>}

    </Container>
}

export default Account;