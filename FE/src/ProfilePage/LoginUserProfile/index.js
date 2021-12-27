import axios from "axios";
import { Fragment, useState, useRef } from "react";
import classes from "./index.module.css";

const LoginUserProfile = (props) => {
  const [loading, setLoading] = useState(false);
  const inputImageCover = useRef(null);
  const { getProfileData } = props;
  console.log(getProfileData);
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/buzzz-social-site/image/upload";
  const loginUser = sessionStorage.getItem("currentUserUsername");

  const updateProfileHandler = async (e, task) => {
    setLoading(true);
    //api call for image upload on cloudinary
    var coverImageLink = "";
    console.log(e)
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      console.log("testttt");
      const files = new FormData();
      files.append("file", e.target.files[0]);
      files.append("upload_preset", "mqq4alyl");
      await fetch(cloudinaryUrl, {
        method: "POST",
        body: files,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          coverImageLink = data.secure_url;
          // console.log('testttt 333333')
        })
        .catch((err) => {
          console.log("File Error - ", err);
          setLoading(false);
        });
    }
    console.log(coverImageLink);
    // console.log(data);
    //api call for IMAGE LINK upload on db

    const { data } = await axios.post("/updateProfileData", {
      coverImageLink,
      loginUser,
      task,
    });
    console.log(data);
    // setCoverImageLink(data.coverImageLink)
    setLoading(false);
  };

  return (
    <Fragment>
      {loading ? <p>Loading</p> : ""}
      <div className={classes.loginUserInformation}>
        <div className={classes.userCoverImage}>
          {getProfileData.userObject.coverImageUrl === "" ? (
            <div className={classes.coverImagesElements}>
              <label htmlFor="coverImage" style={{ cursor: "pointer" }}>
                Upload Image
              </label>
              <input
                type="file"
                id="coverImage"
                ref={inputImageCover}
                onChange={(e) => updateProfileHandler(e, "coverImageUpload")}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <img
              src={getProfileData.userObject.coverImageUrl}
              alt=""
              // onClick={console.log(inputImageCover.current)}
              className={classes.coverImageLink}
            ></img>
          )}
          {getProfileData.userObject.coverImageUrl !== "" && (
            <div className={classes.coverReloadBox}>
              <label className={classes.coverImageReloadButton} htmlFor="coverImageUpdate" >UpdateCoverImage</label>
              <input type="file" style={{display: "none"}} id="coverImageUpdate" onChange={(e) => updateProfileHandler(e, "coverImageUpload")}/>
            </div>
          )}
        </div>
        <div className={classes.userProfileInformation}>
          <div className={classes.profileImageBox}>
            <img
              src={getProfileData.userObject.imageUrl}
              className={classes.userProfileImage}
              alt=""
            ></img>
          </div>
          <label htmlFor="imageUpdate" className={classes.profileImageEdit}>
            <i class="fas fa-camera"></i>
          </label>
          <input
            type="file"
            id="imageUpdate"
            onChange={(e) => updateProfileHandler(e, "profileImageUpload")}
            style={{ display: "none" }}
          ></input>
          <p className={classes.userName}>{getProfileData.userObject.name}</p>
          <div className={classes.userDetailsForm}>
            <div className={classes.formFirstRow}>
              <div>
                <lable htmlFor="firstName">FirstName</lable>
                <p>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter FirstName"
                  ></input>
                </p>
              </div>
              <div>
                <lable htmlFor="lastName">LastName</lable>
                <p>
                  <input type="text" id="lastName"></input>
                </p>
              </div>
            </div>
            <div className={classes.formSecondRow}>
              <div>
                <lable htmlFor="Designation">Designation</lable>
                <p>
                  <input type="text" id="Designation"></input>
                </p>
              </div>
              <div>
                <lable htmlFor="myWebsite">My Website</lable>
                <p>
                  <input type="text" id="myWebsite"></input>
                </p>
              </div>
            </div>
            <div className={classes.formThirdRow}>
              <div>
                <lable htmlFor="gender">Gender</lable>
                <p>
                  <label htmlFor="male">Male</label>
                  <input type="radio" id="male" name="male"></input>
                  <label htmlFor="female" style={{ paddingLeft: "5px" }}>
                    Female
                  </label>
                  <input type="radio" id="female" name="male"></input>
                </p>
              </div>
              <div>
                <label for="birthday">Birthday</label>
                <p>
                  <input type="date" id="birthday" name="birthday" />
                </p>
              </div>
            </div>
            <div className={classes.formFouthRow}>
              <div>
                <lable htmlFor="city">City</lable>
                <div>
                  <input type="text" id="city"></input>
                </div>
              </div>
              <div className={classes.fourthRowElements}>
                <div>
                  <label for="state">State</label>
                  <div>
                    <select name="mystate" id="state">
                      <option>none</option>
                      <option value="up">Up</option>
                      <option value="punjab">Punjab</option>
                    </select>
                  </div>
                </div>
                <div>
                  <lable htmlFor="zip">Zip</lable>
                  <div>
                    <input type="number" style={{ width: "8em" }} id="zip" />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.formFivthRow}>
              <input type="submit" value="Save" />
              <input type="reset" value="Reset All" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginUserProfile;
