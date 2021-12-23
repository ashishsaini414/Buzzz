import { Fragment } from "react";
import React from 'react'
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import classes from "./index.module.css";
import { GoogleLogin } from "react-google-login";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const successResponseGoogle = async (response) => {

      await fetch("/googleLogin",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(response)
      }).then(res => res.json()).then(data =>{
            console.log(data)
            dispatch({type: "LOGIN_USER", payload: data})
            sessionStorage.setItem("currentUser",data.user.name);
            sessionStorage.setItem("imageUrl",data.user.imageUrl);
            sessionStorage.setItem("currentUserUsername",data.user.username)
      })
      navigate("/dashboard");

  };
  const failureResponseGoogle = (response) => {
    console.log(response);
  }

  return (
    <Fragment>
      <div className={classes.loginContainer}>
        <img src={ttnLogo} className={classes.logo} alt="this is ttn logo"></img>
        <h2>Enter your details and Start your journey with us</h2>
        <p>Don't stop until you're proud</p>
        <GoogleLogin
          clientId="539501532126-g3dj34ijo223has1jhjgkff4ofjjk0rt.apps.googleusercontent.com"
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className={classes.loginLink}>Sign In with google</button>
          )}
          buttonText="Login"
          onSuccess={successResponseGoogle}
          onFailure={failureResponseGoogle}
          cookiePolicy={"single_host_origin"}
          // isSignedIn={true}
        />
      </div>
    </Fragment>
  );
};

export default Login;
