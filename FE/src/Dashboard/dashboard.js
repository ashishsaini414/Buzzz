import { Fragment } from "react";
import { useSelector } from "react-redux";
import ttnLogo from "../Assets/Images/TTNLogo.jpeg";
import { FaUser } from "react-icons/fa";
import classes from "./dashboard.module.css";
import Suggestions from "./Suggestions";
import MyFriends from "./myFriends";

const Dashboard = () => {
  const user = useSelector((state) => state.loginUser);

  return (
    <Fragment>
      <nav className={classes.nav}>
        <img src={ttnLogo} alt="this is an ttn logo"></img>
        <div className={classes.navprofile}>
          <img src={user.imageUrl} onError={<FaUser />} alt=""></img>
          <p className={classes.userName}>{user.name}</p>
        </div>
      </nav>
      <div className={classes.suggestions}>
        <Suggestions />
      </div>
      <div className={classes.suggestions}>
        <MyFriends loginUser={user}/>
      </div>
    </Fragment>
  );
};

export default Dashboard;
