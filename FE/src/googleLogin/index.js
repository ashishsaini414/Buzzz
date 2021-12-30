import { Fragment } from "react";
import React from 'react'
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import classes from "./index.module.css";
import { GoogleLogin } from "react-google-login";
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()

  const successResponseGoogle = async (response) => {

      await fetch("/googleLogin",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(response)
      }).then(res => res.json()).then(data =>{
            console.log("This is login information",data)
              localStorage.setItem("authToken",JSON.stringify(data.token))
              localStorage.setItem("currentUser",data.user.name);
              localStorage.setItem("imageUrl",data.user.imageUrl);
              localStorage.setItem("currentUserUsername",data.user.username)
              navigate("/dashboard")           
      })
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
          clientId={process.env.REACT_APP_CLIENT_ID}
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
