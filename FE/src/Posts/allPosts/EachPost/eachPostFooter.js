import classes from './eachPostFooter.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EachComment from './EachComment/eachcomment'
import { toast } from 'react-toastify'

const EachPostFooter = (props) =>{
    
    const { post } = props
    const [likeToggle, setLikeToggle] = useState(false)
    const [dislikeToggle, setDisLikeToggle] = useState(false)
    const [postComment, setPostComment] = useState("")
    const [allCommentsData, setAllCommentsData] = useState([])
    const [commentsShow, setCommentsShow] = useState(true)

    const dispatch = useDispatch();
    const selector = useSelector(state => state.posts)
    console.log(selector)
    

    const currentUserimageUrl = sessionStorage.getItem("imageUrl")
    const currentUserUsername = sessionStorage.getItem("currentUserUsername")

    useEffect(()=>{
        if(post.postReactions.likes.includes(currentUserUsername)){
            setLikeToggle(prevState => !prevState)
        }
        if(post.postReactions.dislikes.includes(currentUserUsername)){
            setDisLikeToggle(prevState => !prevState)
        }
    },[])
    

    const likeButtonHandler = async (likePost, condition) => {
        console.log(likePost)
       const response =  await fetch("/postReaction",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({user: currentUserUsername, reaction: condition, postId: likePost._id})
        })
        const res = await response.json()
        console.log(res)
        // dispatch({type: "UPDATE_LIKE_DISLIKE",payload: res.updatedpost})

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
        console.log(res)
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
            // setAllCommentsData(prevState => {
            //     if(prevState){
            //         console.log(prevState)
            //         const newarrr =[]
            //         console.log(result)
            //         prevState.map(c => {
            //            const new6 =  result.map(ce => {
            //                 if(c._id !== ce._id ){
            //                     // newarrr.push(ce)
            //                     return ce
            //                 }
            //             })
            //         console.log(new6)
            //         })
            //         return [...prevState, ...result]
            //     }
            //     else {
            //         return [...result]
            //     }
                
            // })
            // setAllCommentsData(prevState => { 
            //     console.log(prevState)
            //     console.log(result)
            //     const newarr = prevState.map(c => {
            //         for(const key in result){
            //             if(result[key]._id !== c._id){
            //                 return result[key]
            //             }
            //         }
            //     })
            //     return newarr
            // })
            setAllCommentsData(prevState => [...prevState, ...result])   //PROBLEM OF DUPICACY OF DATA
        }
    }
    return(<div>
        <div className={classes.FirstRow}>
            {!likeToggle ? <button id={classes.likeButton} disabled={dislikeToggle} className={classes.activityButton} onClick={()=>likeButtonHandler(post,"like")}><i className="far fa-thumbs-up"></i>Like</button> : 
            <button id={classes.unlikeButton} className={classes.activityButton} onClick={()=>likeButtonHandler(post,"unlike")}>UnLike</button> }

            {!dislikeToggle ? <button id={classes.likeButton} disabled={likeToggle} className={classes.activityButton} onClick={()=>dislikeButtonHandler(post,"dislike")}><i class="far fa-thumbs-down"></i>DisLike</button> : 
            <button id={classes.unlikeButton} className={classes.activityButton} onClick={()=>dislikeButtonHandler(post,"unDislike")}>Un-DisLike</button> }

            <button id={classes.commentButton} className={classes.activityButton} onClick={PostAllCommentsHandler}><i class="far fa-comment-alt"></i>Comment</button>
        </div>
        <div className={classes.secondRow}>
            <img src={currentUserimageUrl} className={classes.userImage}></img>
            <form onSubmit={commentSubmitHandler}>
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