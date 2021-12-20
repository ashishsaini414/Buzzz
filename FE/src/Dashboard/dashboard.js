import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import classes from "./dashboard.module.css";
import Suggestions from "../SuggestionComponent/Suggestions";
import MyFriends from "../FriendsComponent/allFriends";
import { GoogleLogout} from 'react-google-login';
import { useNavigate } from "react-router-dom";
import Posts from '../Posts/posts';
import userLogo from '../Assets/Images/userlogo';


const Dashboard = () => {
  const navigate = useNavigate()
  // const [currentUser, setCurrentUser] = useState({})
  const [addFriend, setAddFriend] = useState({})
  const user = useSelector((state) => state);
  // console.clear()
  // console.log(user) 
  // console.log("test")
  // console.log("test")

  const currentUser = sessionStorage.getItem("currentUser");
  const currentUserimageUrl = sessionStorage.getItem("imageUrl")

  const logout = (response) => {
    console.clear()
    navigate("/")
    sessionStorage.removeItem("currentUser")
    sessionStorage.removeItem("currentUserUsername")
    sessionStorage.removeItem("imageUrl")

  }
  const addFriendHandler = (response)=>{
      setAddFriend(response)
  }

  return (
    <Fragment>
      <div className={classes.dashboard}>
      <nav className={classes.nav}>
        <img src={ttnLogo} alt="this is an ttn logo" className={classes.WebsiteLogo}></img>
        <div className={classes.navprofile}>
          <img src={currentUserimageUrl} onError={(e)=> e.target.setAttribute("src",userLogo)} className={classes.userImage} alt=""></img>
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
     
      <div className={classes.middleComponents}> 
        <div className={classes.posts}>
                <Posts/>
        </div>
        <aside className={classes.asideComponents}>
        <div className={classes.suggestionsComponent}>
          <h2 className={classes.suggestionHeader}>Suggestions</h2>
          <div className={classes.suggestionList}>
              <Suggestions key={Math.random().toString()} addFriend={addFriendHandler}/>
          </div>
        </div>
        <div className={classes.myFriends}>
          <div className={classes.suggestionsComponent}>
            <h2 className={classes.suggestionHeader}>MyFriends</h2>
          <div className={classes.suggestionList}>
          <MyFriends loginUser={user}  key={Math.random().toString()} addFriend={addFriend}/>
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
