import classes from "./eachPost.module.css";
// import { Image } from "cloudinary-react";
import SimpleImageSlider from "react-simple-image-slider"
import EachPostHeader from "./eachPostHeader";
import EachPostFooter from "./eachPostFooter";


const EachPost = (props) => {
  const { post } = props;
  // console.log(post);
  
  return (
    <>
      <div className={classes.post}>
        <header><EachPostHeader post={post}/></header>
        <div className={classes.postMessageBox}>
          <p className={classes.postMessage}>{post.message}</p>
        </div>
        {post.imagesUrl[0].url !== "" && <div className={classes.postImages}>
        <SimpleImageSlider
        width={572}
        height={500}
        images={post.imagesUrl}
        showBullets={true}
        showNavs={true}
        startIndex={0}
        loop={false}
        style={{position: "relative"}}
        //styling issue of images in this slider
        />
        </div>}
        <footer><EachPostFooter post={post}/></footer>
      </div>
    </>
  );
};

export default EachPost;
