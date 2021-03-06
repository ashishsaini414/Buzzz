import { Fragment, useState } from "react";
import classes from "./createPost.module.css";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
import Loader from "../../Assets/Loader/loader";

const CreatePost = () => {

  const [filesUploaded, setFilesUploaded] = useState("");
  const currentUserimageUrl = localStorage.getItem("imageUrl");
  const [isFileSizeRight, setIsFileSizeRight] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch()

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/buzzz-social-site/image/upload";
  const currentUser = localStorage.getItem("currentUserUsername");

  const postSubmitHandler = async (e) => {
    var imagesArray = [];
    e.preventDefault();

    if (isFileSizeRight && (filesUploaded !== [])) {
    setLoading(true);

      try {
        for (const key in filesUploaded) {
          const files = new FormData();
          files.append("file", filesUploaded[key]);
          files.append("upload_preset", "mqq4alyl");
          await fetch(cloudinaryUrl,
            {
              method: "POST",
              body: files,
            }
          )
            .then((res) => res.json())
            .then((data) => {
                imagesArray.push(data.secure_url)
            })
            .catch((err) => {
              console.log("File Error - ", err);
              setLoading(false);
            });
        }
      } catch (err) {
        console.log("Error", err);
        setLoading(false);
        setInputText("")

      }
    } 
    if(isFileSizeRight) {
    setLoading(true);
        var postData = { message: inputText, user:  currentUser, postImages: imagesArray};
        try{ 
            await fetch("/createPost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData)
              }).then(response => response.json())
              .then(data => {
                dispatch({type: "UPDATE_NEW_POST", payload: data}); 
                // console.log(data); 
                toast.success("Post Uploaded Successfully")})
              .catch(err => console.log(err))
            setLoading(false)
            setInputText("")
        }
        catch(err){
            console.log(err)
            setLoading(false)
            setInputText("")
        }
    }
    setFilesUploaded([]);
  };

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    //Each file should be should be less than 300kb
    if (file.size < 300000) {
      setIsFileSizeRight(true);
      toast.success(`${filesUploaded.length + 1} files uploaded`)
      setFilesUploaded((prevState) => [...prevState, file]);
    } else {
      setIsFileSizeRight(false);
    }
  };

  return (
    <Fragment>
    <div className={classes.CreatePost}>
      <img src={currentUserimageUrl} className={classes.userImage} alt=""></img>
      <form onSubmit={postSubmitHandler} className={classes.postForm}>
        <input
          type="text"
          value={inputText}
          className={classes.postInput}
          placeholder="Enter Text ..."
          onChange={(e)=> setInputText(e.target.value)}
        ></input>
        <label htmlFor="postfile" className={classes.fileUploadLabel}>
         <span className={classes.fileUploadIcon}><i className="far fa-images"></i></span> Photos/Videos
        </label>
        <input
          type="file"
          className={classes.fileUpload}
          id="postfile"
          maxLength="20"
          onChange={(e) => fileUploadHandler(e)}
        ></input>
        {!isFileSizeRight ? <p className={classes.fileSizeText}>File must be less than 300kb </p> : "" }
      </form>
    </div>
    {loading && <Loader/>}
    </Fragment>
  );
};
export default CreatePost;
