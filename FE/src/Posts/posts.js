import { Fragment } from "react";
import CreatePost from './createPost.js/createPost'
import classes from './posts.module.css';

const Posts = (props) => {
        return <div className={classes.posts}>
                <div className={classes.createPost}>
                <CreatePost/>
                </div>
        </div >
}

export default Posts;