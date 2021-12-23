import classes from './eachPostHeader.module.css'

const EachPostHeader = (props) => {
        const { post } = props;
        const {user} = post
return (
        <div className={classes.PostHeader}>
          <div className={classes.postDeatils}>
                <img src={user.imageUrl} className={classes.postOwnerImage} alt=""></img>
                <div className={classes.middlePart}>
                  <p className={classes.postOwnerName}>{user.name}</p>
                  <p className={classes.postCreatedDate}>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
          </div>
                <span className={classes.postOptions}><i className="fas fa-ellipsis-h"></i></span>
        </div>
)
}

export default EachPostHeader;