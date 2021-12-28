import classes from './topComponent.module.css';
import { useSelector  } from 'react-redux';
import SampleCoverImage from '../../Assets/Images/blank_wallpaper.jpg'

const TopComponent = () => {
        
        const currentUserimageUrl = sessionStorage.getItem("imageUrl");
        const currentUserUsername = sessionStorage.getItem("currentUser");

        const selector = useSelector(state => state.users.loginUserInfo)
        console.log(selector)

return <div className={classes.topComponent}>
          <img className={classes.coverImage} src={selector.loginUserObject.coverImageUrl} height="100%" width="100em" alt=""  onError={(e)=> e.target.setAttribute("src",SampleCoverImage)}></img>
          <div className={classes.userDetails}>
                <img src={currentUserimageUrl} className={classes.userImage} alt=""></img>
                <p className={classes.userName}>{currentUserUsername}</p>
                <p className={classes.userTitle}>Newly Recruit at TTN</p>
            </div>
            <div className={classes.userPosts}>
                <div className={classes.startingPart}>
                   <p>{selector.profileViews}</p>
                   <p>Profile views</p>
                </div>
                <div className={classes.lastPart}>
                   <p>{selector.postCounts}</p>
                   <p>Posts</p>
                </div>
            </div>
    </div>
}

export default TopComponent;