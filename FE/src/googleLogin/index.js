import { Fragment } from "react";
import React from 'react'
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import classes from "./index.module.css";
import { GoogleLogin } from "react-google-login";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const successResponseGoogle = async (response) => {

      await fetch("/googleLogin",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(response)
      }).then(res => res.json()).then(data =>{
            console.log(data)
            // localStorage.remove("currentUser")
            localStorage.setItem("currentUser",data.user.name);
            localStorage.setItem("imageUrl",data.user.imageUrl);
            localStorage.setItem("currentUserUsername",data.user.username)
            console.log(localStorage.getItem("currentUser"))
            // setLogin(prevState => [...prevState,data])
            setLogin(data)
      })
      // console.clear()

      console.log(login)
      navigate("/dashboard");

  };
  const failureResponseGoogle = (response) => {
    console.log(response);
    console.log(login);
  }
console.log(login)
  return (
    <Fragment>
      <div className={classes.loginContainer}>
        <img src={ttnLogo} className={classes.logo} alt="this is ttn logo"></img>
        <h2>Enter your details and Start your journey with us</h2>
        <p>Don't stop until you're proud</p>
        <GoogleLogin
          clientId="434076698303-4vqlab3auqoeeclm3tkm2c2ki7cpghvp.apps.googleusercontent.com"
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className={classes.loginLink}>Sign In with google</button>
          )}
          buttonText="Login"
          onSuccess={successResponseGoogle}
          onFailure={failureResponseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
    </Fragment>
  );
};

export default Login;
