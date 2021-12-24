import classes from './eachPostFooter.module.css'
import { useEffect, useState } from 'react'
import EachComment from './EachComment/eachcomment'
import { toast } from 'react-toastify'

const EachPostFooter = (props) =>{
    
    const { post } = props
    const [likeToggle, setLikeToggle] = useState(false)
    const [dislikeToggle, setDisLikeToggle] = useState(false)
    const [postComment, setPostComment] = useState("")
    const [commentsShow, setCommentsShow] = useState(true)
    const [allCommentsData, setAllCommentsData] = useState([]);
    const [totalLikesDislikesComments, setTotalLikesDislikesComments] = useState({})

    const currentUserimageUrl = sessionStorage.getItem("imageUrl")
    const currentUserUsername = sessionStorage.getItem("currentUserUsername")

    useEffect(()=>{
        if(post.postReactions.likes.includes(currentUserUsername)){
            setLikeToggle(prevState => !prevState)
        }
        if(post.postReactions.dislikes.includes(currentUserUsername)){
            setDisLikeToggle(prevState => !prevState)
        }
    },[currentUserUsername])

    useEffect(()=>{
       async function likesDislikesComments(){
            var postDataForLikes = {postId: post._id}
            const response = await fetch("/getPostLikesDislikesCommentsValues",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(postDataForLikes)
            })
            const result = await response.json();
            setTotalLikesDislikesComments(result);
        }
        likesDislikesComments();
        
    },[likeToggle,dislikeToggle,postComment])
    

    const likeButtonHandler = async (likePost, condition) => {
        console.log(likePost)
       const response =  await fetch("/postReaction",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({user: currentUserUsername, reaction: condition, postId: likePost._id})
        })
        const res = await response.json()
        // console.log(res)
        // setTotalLikes(res.totallikes)
        setLikeToggle(prevState => !prevState)
    }
    const dislikeButtonHandler = async (dislikePost, condition) => {
        console.log(dislikePost)
       const response =  await fetch("/postReaction",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({user: currentUserUsername, reaction: condition, postId: dislikePost._id})
        })
        const res = await response.json()
        // console.log(res)
        // setTotalDisLikes(res.totalDislikes)
        setDisLikeToggle(prevState => !prevState)
    }

    const commentSubmitHandler = async (event) => {
        event.preventDefault();
        const response  = await fetch("/postComment",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({message: postComment, postId: post._id, user: currentUserUsername})
        })
        const result = await response.json()
        toast.success(`Comment added successfully`)
        setPostComment("")
        console.log(result)

        
    }
    const PostAllCommentsHandler = async () =>{
        setCommentsShow(prevState => !prevState)
        if(commentsShow){
            const response = await fetch("/getPostAllComments",{
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({postId: post._id})
            })
            const result = await response.json()
            if(result.length === 0){
                toast.error("No comments")
            }
            setAllCommentsData(result)
        }
    }
    return(<div>
        <div className={classes.postLikesDislikesCommentsNumbers}>
            <div style={{display: "flex", columnGap: "1em"}}>
                <p className={classes.totalLikes}><span className={classes.likesIcon}><i className="far fa-thumbs-up"></i></span> {totalLikesDislikesComments.totalLikes}</p>
                <p className={classes.totalDislikes}><span className={classes.dislikesIcon}><i className="far fa-thumbs-down"></i></span> {totalLikesDislikesComments.totalDislikes}</p>
            </div>
            <p className={classes.totalComments}>{`${totalLikesDislikesComments.totalComments} comments`}</p>
        </div>
        <div className={classes.FirstRow}>
            {!likeToggle ? <button id={classes.likeButton} disabled={dislikeToggle} className={classes.activityButton} onClick={()=>likeButtonHandler(post,"like")}>
                <i className="far fa-thumbs-up"></i>
                <span className={classes.LikeText}>Like</span>
            </button> : 
            <button id={classes.unlikeButton} className={classes.activityButton} onClick={()=>likeButtonHandler(post,"unlike")}>UnLike</button> }

            {!dislikeToggle ? <button id={classes.likeButton} disabled={likeToggle} className={classes.activityButton} onClick={()=>dislikeButtonHandler(post,"dislike")}>
                <i className="far fa-thumbs-down"></i>
                <span className={classes.LikeText}>DisLike</span>
            </button> : 
            <button id={classes.unlikeButton} className={classes.activityButton} onClick={()=>dislikeButtonHandler(post,"unDislike")}>Un-DisLike</button> }

            <button id={classes.commentButton} className={classes.activityButton} onClick={PostAllCommentsHandler}>
                <i className="far fa-comment-alt" id={classes.commentButtontext}>
                    </i><span className={classes.LikeText}>Comment</span>
            </button>
        </div>
        <div className={classes.secondRow}>
            <img src={currentUserimageUrl} className={classes.userImage} alt=""></img>
            <form onSubmit={commentSubmitHandler} className={classes.commentForm}>
                <input className={classes.enterCommentField} value={postComment} onChange={(e)=> setPostComment(e.target.value)} placeholder="Write a comment ..."></input>
            </form>
       
        </div>
        { !commentsShow ? 
            allCommentsData.map((singleComment,index) => {
                return <div>
                         <EachComment key={index} singleComment={singleComment}/>
                    </div>
            }) : ""
        }
    </div>)
}

export default EachPostFooter;