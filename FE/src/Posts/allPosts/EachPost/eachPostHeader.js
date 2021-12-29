import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classes from "./eachPostHeader.module.css";

const EachPostHeader = (props) => {
  const { post, moderatorMode } = props;
  const { user } = post;

  const currentUserUsername = sessionStorage.getItem("currentUserUsername");
  const [isAlreadyReported, setIsAlreadyReported] = useState(false);
  const [showPostMenu, setShowPostmenu] = useState(false);

  useEffect(() => {
    if (post.reports.includes(currentUserUsername)) {
      setIsAlreadyReported(true);
    }
  }, [currentUserUsername, post.reports]);

  const reportPostHandler = async (e) => {
    console.log(e);
    const { data } = await axios.post("/reportPost", {
      loginUser: currentUserUsername,
      reportedPostId: e._id,
    });
    if (data.reports.includes(currentUserUsername)) {
      toast.success("Reported Successfully");
    }
    console.log(data);
    setIsAlreadyReported(true);
  };

  const removePostHandler = async () => {
    const { data: mydata } = await axios.delete("/deletePost", {
      data: {
        postId: post._id,
      },
    });
    console.log(mydata);
    toast.success("Post deleted Successfully")
  };

  return (
    <div className={classes.PostHeader}>
      <div className={classes.postDeatils}>
        <img
          src={user.imageUrl}
          className={classes.postOwnerImage}
          alt=""
        ></img>
        <div className={classes.middlePart}>
          <p className={classes.postOwnerName}>{user.name}</p>
          <p className={classes.postCreatedDate}>
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {showPostMenu && (
        <div className={classes.postMenu}>
          <ul className={classes.postMenuList}>
            {user.username === currentUserUsername && !moderatorMode && (
              <li onClick={removePostHandler}>Remove</li>
            )}
            {moderatorMode && <li onClick={removePostHandler}>Remove</li>}
            {!isAlreadyReported && (
              <li onClick={() => reportPostHandler(post)}>Report Post</li>
            )}
            <li>Share</li>
          </ul>
        </div>
      )}

      <div className={classes.postMenuAndFlagIcons}>
        <span
          className={classes.postFlagIcon}
          style={
            !moderatorMode ? { visibility: "hidden" } : { visibility: "show" }
          }
        >
          <i className="fas fa-flag"></i>
        </span>
        <span
          className={classes.postOptions}
          onClick={() => setShowPostmenu((prevState) => !prevState)}
        >
          <i className="fas fa-ellipsis-h"></i>
        </span>
      </div>
    </div>
  );
};

export default EachPostHeader;
