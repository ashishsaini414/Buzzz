import classes from './eachPostHeader.module.css'

const EachPostHeader = (props) => {
        const { post } = props;
        // const { user } =  postUserData;
        const {user} = post
        // console.log(post)
return (
        <div className={classes.PostHeader}>
          <div className={classes.startingPart}>
                <img src={user.imageUrl} className={classes.userImage}></img>
                <div className={classes.middlePart}>
                  <p>{user.name}</p>
                  <p>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
          </div>
                <span className={classes.postOptions}><i class="fas fa-ellipsis-h"></i></span>
        </div>
)
}

export default EachPostHeader;