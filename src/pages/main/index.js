import "../../App.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/slices/userSlice";
import { getUser } from "../../getUser";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [type, setType] = useState(1) //1 - login, 2 - sign up  

  const [loginData, setLoginData] = useState({login: "", password: "", id: 1});
  const [signupData, setSignupData] = useState({login: "", password1: "", password2: ""});

  const signUp = () => {
    dispatch(createUser({
      login: signupData.login,
      password: signupData.password1,
      id: 1
    }))
  }

  const login = () => {
    if (getUser(loginData)) {
      localStorage.setItem("user_imitation_token", JSON.stringify(loginData));
      navigate("/user")
    } else {
      console.log("нету")
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" flexDirection="column">
      {type === 1 && (
        <>
          <input
            value={loginData.login}
            onChange={(e) => setLoginData({...loginData, login: e.target.value})}
            style={{marginBottom: "10px"}}
            placeholder="Ваш логин"
          />
          <input
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            style={{marginBottom: "10px"}}
            type="password"
            placeholder="Ваш пароль"
          />  
          <button onClick={login}>Войти</button>    
          <div 
            style={{width: "184px", display: "flex", justifyContent: "flex-end", marginTop: "20px", cursor: "pointer"}}
            onClick={() => setType(2)}
          >
            <span>РЕГИСТРАЦИЯ</span>
          </div>   
        </>
      )}
      {type === 2 && (
        <>
          <input
            value={signupData.login}
            onChange={(e) => setSignupData({...signupData, login: e.target.value})}
            style={{marginBottom: "10px"}}
            placeholder="Придумайте логин"
          />
          <input
            value={signupData.password1}
            onChange={(e) => setSignupData({...signupData, password1: e.target.value})}
            style={{marginBottom: "10px"}}
            type="password"
            placeholder="Придумайте пароль"
          />   
          <input
            value={signupData.password2}
            onChange={(e) => setSignupData({...signupData, password2: e.target.value})}
            style={{marginBottom: "10px"}}
            type="password"
            placeholder="Повторите пароль"
          />      
          <button onClick={signUp}>Зарегистрироваться</button> 
          <div 
            style={{width: "184px", display: "flex", justifyContent: "flex-end", marginTop: "20px", cursor: "pointer"}}
            onClick={() => setType(1)}
          >
            <span>ЛОГИН</span>
          </div> 
        </>
      )}
      
    </Box>
  );
}