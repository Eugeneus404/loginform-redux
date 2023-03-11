import "../../App.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../store/slices/userSlice";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changeLocalStorage } from "../../functions/changeLocalStorage";
import { Button, Input, LoginForm, MainLayout, H1, Text, TextLink } from "../style";
import { toast } from "react-toastify";

export const Main = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)

  const navigate = useNavigate();

  const [type, setType] = useState(1) //1 - login, 2 - sign up  

  const [loginData, setLoginData] = useState({login: "", password: "", id: 1});
  const [signupData, setSignupData] = useState({login: "", password1: "", password2: ""});

  const getUser = () => (
    users.find(v => v.login === loginData.login && v.password === loginData.password)
  )

  const signUp = () => {

    if (signupData.password1 !== signupData.password2) {
      toast.error("Пароли не совпадают!")
      return
    }

    dispatch(createUser({
      login: signupData.login,
      password: signupData.password1,
      id: 1
    }))

    toast.success("Успешная регистрация!")
  }

  const login = () => {
    if (getUser()) {
      changeLocalStorage("create", loginData);
      navigate("/user")
    } else {
      toast.error("Неверные данные аккаунта!")
    }
  }

  useEffect(() => {
    const deleteCookie = () => {
      changeLocalStorage("delete");
    }

    deleteCookie()
  }, [])

  return (
    <MainLayout>
      {type === 1 && (
        <LoginForm>
          <H1>Добро пожаловать!</H1>
          <Input
            value={loginData.login}
            onChange={(e) => setLoginData({...loginData, login: e.target.value})}
            style={{marginBottom: "10px"}}
            placeholder="Ваше имя"
          />
          <Input
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            style={{marginBottom: "10px"}}
            type="password"
            placeholder="Ваш пароль"
          />  
          <Button onClick={login} disabled={!loginData.login || !loginData.password}>Войти</Button>    
          <Box display="flex" marginTop="15px">
            <Text>Еще нет аккаунта?</Text>&nbsp;
            <TextLink onClick={() => setType(2)}>Создайте!</TextLink>
          </Box>  
        </LoginForm>
      )}
      {type === 2 && (
        <LoginForm>
          <H1>Создайте аккаунт!</H1>
          <Input
            value={signupData.login}
            onChange={(e) => setSignupData({...signupData, login: e.target.value})}
            style={{marginBottom: "10px"}}
            placeholder="Придумайте имя"
          />
          <Input
            value={signupData.password1}
            onChange={(e) => setSignupData({...signupData, password1: e.target.value})}
            style={{marginBottom: "10px"}}
            type="password"
            placeholder="Придумайте пароль"
          />   
          <Input
            value={signupData.password2}
            onChange={(e) => setSignupData({...signupData, password2: e.target.value})}
            style={{marginBottom: "10px"}}
            type="password"
            placeholder="Повторите пароль"
          />      
          <Button onClick={signUp} disabled={!signupData.login || !signupData.password1 || !signupData.password2}>Зарегистрироваться</Button> 
          <Box display="flex" marginTop="15px">
            <Text>Уже есть аккаунт?</Text>&nbsp;
            <TextLink onClick={() => setType(1)}>Войдите!</TextLink>
          </Box>
        </LoginForm>
      )}
    </MainLayout>
  );
}