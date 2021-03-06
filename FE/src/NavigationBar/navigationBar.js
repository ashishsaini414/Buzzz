import { Fragment } from "react"
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import { GoogleLogout} from 'react-google-login';
import userLogo from '../Assets/Images/userlogo';
import { useNavigate } from "react-router-dom";

import NotificationIcon from "../Dashboard/Notifications.js/notifications";

import classes from './navigationBar.module.css';

const NavigationBar = () => {

  const navigate = useNavigate()

  const currentUserimageUrl = localStorage.getItem("imageUrl");
  const currentUser = localStorage.getItem("currentUser");
  const currentUserUsername = localStorage.getItem("currentUserUsername");

  const logout = (response) => {
    localStorage.removeItem("tokenDetails")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserUsername")
    localStorage.removeItem("imageUrl")
    localStorage.setItem("isLoggedIn",false)
    navigate("/")
  }

    return <Fragment>
        <nav className={classes.nav}>
        <img src={ttnLogo} alt="this is an ttn logo" className={classes.WebsiteLogo} onClick={()=> navigate("/dashboard")}></img>
        <div className={classes.navprofile}>
          <img src={currentUserimageUrl} onError={(e)=> e.target.setAttribute("src",userLogo)} className={classes.userImage} alt=""></img>
          <p className={classes.userName} onClick={()=> navigate(`/profile/${currentUserUsername}`)} >{currentUser}</p>
          <NotificationIcon/>
          <GoogleLogout
            clientId="434076698303-4vqlab3auqoeeclm3tkm2c2ki7cpghvp.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className={classes.logoutLink}>Sign Out</button>
            )}
            buttonText="Logout"
            onLogoutSuccess={logout}
          >
          </GoogleLogout>
        </div>
      </nav>
    </Fragment>
}

export default NavigationBar