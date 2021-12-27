import { Fragment, useEffect, useState } from "react";
import classes from "./eachProfilePage.module.css";
import { useParams } from "react-router-dom";
import AccountOwnerProfile from "./LoginUserProfile";
import axios from "axios";
import OtherUserProfile from "./OtherUserProfile";

const EachProfilePage = () => {
  const [getProfileData, setGetProfileData] = useState({
    userObject:{
      friends: []
    }
  });
  const params = useParams();

  const currentUserUsername = sessionStorage.getItem("currentUserUsername");

  useEffect(() => {
    async function getProfileData() {
      const { data } = await axios.post("/getProfileData", {
        profileUserUsername: params.id,
        loginUserUsername: currentUserUsername
      });
      // console.log(response)
      setGetProfileData(data);
    }
    getProfileData();
  }, [params]);

  console.log(getProfileData);

  return (
    <Fragment>
     {!getProfileData.isAccountOwner && <OtherUserProfile getProfileData={getProfileData}/>}
     {getProfileData.isAccountOwner && <AccountOwnerProfile getProfileData={getProfileData}/>}    
    </Fragment>
  );
};
export default EachProfilePage;
