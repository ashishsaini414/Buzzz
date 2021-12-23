import classes from './topComponent.module.css';

const TopComponent = () => {
    return <div>
            <div className={classes.coverImage}></div>
            <div className={classes.userDetails}></div>
            <div className={classes.userPosts}></div>
    </div>
}

export default TopComponent;