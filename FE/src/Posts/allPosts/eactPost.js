import classes from './eachPost.module.css';
import { Image } from 'cloudinary-react'

const EachPost = (props) => {
    const { post} = props
    console.log(post)
        return <>
            <div className={classes.post}>
                <p>{post.message}</p>
                <div className={classes.postImages}>
                {post.imagesUrl.map(image => <span className={classes.eachImage}><Image cloudName="buzzz-social-site"  className={classes.eachImage} publicId={image} alt=""></Image></span>)}
                </div>
            </div>
        </>
}

export default EachPost;