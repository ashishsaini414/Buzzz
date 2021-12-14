import { Fragment } from "react";
import React from 'react'
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import classes from "./index.module.css";
import { GoogleLogin } from "react-google-login";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const successResponseGoogle = async (response) => {
      const { profileObj } = response;
      dispatch({type: "LOGIN_USER", data: profileObj})
      navigate("/dashboard");
      console.log(profileObj)
  };
  const failureResponseGoogle = (response) => {
    console.log(response)
  }
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
