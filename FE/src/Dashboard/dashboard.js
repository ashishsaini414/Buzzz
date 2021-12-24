import { Fragment} from "react";
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import classes from "./dashboard.module.css";
import Suggestions from "../SuggestionComponent/Suggestions";
import MyFriends from "../FriendsComponent/allFriends";
import { GoogleLogout} from 'react-google-login';
import { useNavigate } from "react-router-dom";
import Posts from '../Posts/posts';
import userLogo from '../Assets/Images/userlogo';
import UserDashboardComponent from "../UserDashboardComponent";
import NotificationIcon from "./Notifications.js/notifications";

const Dashboard = () => {
  const navigate = useNavigate()

  const currentUser = sessionStorage.getItem("currentUser");
  const currentUserimageUrl = sessionStorage.getItem("imageUrl")

  const logout = (response) => {
    console.clear()
    navigate("/")
    sessionStorage.removeItem("currentUser")
    sessionStorage.removeItem("currentUserUsername")
    sessionStorage.removeItem("imageUrl")

  }

  return (
    <Fragment>
      <div className={classes.dashboard}>
      <nav className={classes.nav}>
        <img src={ttnLogo} alt="this is an ttn logo" className={classes.WebsiteLogo}></img>
        <div className={classes.navprofile}>
          <img src={currentUserimageUrl} onError={(e)=> e.target.setAttribute("src",userLogo)} className={classes.userImage} alt=""></img>
          <p className={classes.userName}>{currentUser}</p>
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
     
      <div className={classes.middleComponents}>
        <div className={classes.UserComponent}>
          <UserDashboardComponent/>
        </div>
        <div className={classes.posts}>
                <Posts/>
        </div>
        <aside className={classes.asideComponents}>
        <div className={classes.suggestionsComponent}>
          <div className={classes.suggestionHeader}>
            <h2 className={classes.suggestionTitle}>Suggestions</h2>
            <span className={classes.searchIcon}><i className="fas fa-search"></i></span>
          </div>
          <div className={classes.suggestionList}>
              <Suggestions key={Math.random().toString()} />
          </div>
        </div>
        <div className={classes.myFriends}>
          <div className={classes.suggestionsComponent}>
          <div className={classes.suggestionHeader}>
            <h2 className={classes.suggestionTitle}>Contacts</h2>
            <span className={classes.searchIcon}><i className="fas fa-search"></i></span>
          </div>
          <div className={classes.suggestionList}>
          <MyFriends key={Math.random().toString()} />
          </div>
          </div>
        </div>
        </aside>
      
      </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
