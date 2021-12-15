import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import { FaUser } from "react-icons/fa";
import classes from "./dashboard.module.css";
import Suggestions from "./Suggestions";
import MyFriends from "./myFriends";
import { GoogleLogout} from 'react-google-login';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  // const [currentUser, setCurrentUser] = useState({})
  const user = useSelector((state) => state);
  // console.clear()
  console.log(user)
  const currentUser = localStorage.getItem("currentUser");
  const currentUserimageUrl = localStorage.getItem("imageUrl")
  // console.log(currentUser)

  const logout = (response) => {
    console.clear()
    navigate("/")
  }

  return (
    <Fragment>
      <nav className={classes.nav}>
        <img src={ttnLogo} alt="this is an ttn logo"></img>
        <div className={classes.navprofile}>
          <img src={currentUserimageUrl} onError={<FaUser />} alt=""></img>
          <p className={classes.userName}>{currentUser}</p>
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
      <div className={classes.suggestions}>
        <Suggestions/>
      </div>
      <div className={classes.suggestions}>
        <MyFriends loginUser={user}/>
      </div>
    </Fragment>
  );
};

export default Dashboard;
