import classes from './eachPostFooter.module.css'

const EachPostFooter = () =>{
    const currentUserimageUrl = sessionStorage.getItem("imageUrl")
    return(<div>
        <div className={classes.FirstRow}>
            <button id={classes.likeButton} className={classes.activityButton}>Like</button>
            <button id={classes.dislikeButton} className={classes.activityButton}>Dislike</button>
            <button id={classes.commentButton} className={classes.activityButton}>Comment</button>
        </div>
        <div className={classes.secondRow}>
            <img src={currentUserimageUrl} className={classes.userImage}></img>
            <input className={classes.enterCommentField} placeholder="Write a comment ..."></input>
        </div>
    </div>)
}

export default EachPostFooter;