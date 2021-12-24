import classes from './topComponent.module.css';
import { useSelector  } from 'react-redux';

const TopComponent = () => {
        
        const currentUserimageUrl = sessionStorage.getItem("imageUrl");
        const currentUserUsername = sessionStorage.getItem("currentUser");

        const selector = useSelector(state => state.users.loginUserInfo)

return <div className={classes.topComponent}>
          <img className={classes.coverImage} src="https://res.cloudinary.com/buzzz-social-site/image/upload/v1640357739/wallpaperflare.com_wallpaper_lp2qgy.jpg" height="100%" width="100em" alt=""></img>
          <div className={classes.userDetails}>
                <img src={currentUserimageUrl} className={classes.userImage} alt=""></img>
                <p className={classes.userName}>{currentUserUsername}</p>
                <p className={classes.userTitle}>Newly Recruit at TTN</p>
            </div>
            <div className={classes.userPosts}>
                <div className={classes.startingPart}>
                   <p>#234</p>
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