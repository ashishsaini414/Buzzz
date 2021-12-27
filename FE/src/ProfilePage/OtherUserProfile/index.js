import { Fragment } from "react";
import userLogo from "../../Assets/Images/userlogo";
import classes from "./index.module.css";

const OtherUserProfile = (props) => {
  const { getProfileData } = props;
  return (
    <Fragment>
      <div className={classes.loginUserInformation}>
        <div className={classes.userCoverImage}>
          <img src={getProfileData.userObject.coverImage} alt=""></img>
        </div>
        <div className={classes.OtherUserInformation}>
        <div>
          <img
            src={getProfileData.userObject.imageUrl}
            className={classes.userProfileImage}
            alt=""
            onError={(e) => e.target.setAttribute("src", userLogo)}
          ></img>
        </div>
        <p className={classes.userName}>{getProfileData.userObject.name}</p>
        <div className={classes.userDetails}>
          <p>This is about the ashish</p>
          <span>Roorkee,uttarakhand *</span>
          <span>{`${getProfileData.userObject.friends.length} friends`}</span>
        </div>
        <div>
          <button name="addFriend" className={classes.addFriendButton}>
            <i class="fas fa-user-plus"></i> Add Friend
          </button>
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noreferrer"
            className={classes.VisitWebsiteLink}
          >
            <i class="fas fa-external-link-alt"></i> Visit Website
          </a>
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OtherUserProfile;
