import { Fragment, useEffect, useState } from "react";
import EachPost from "./eactPost";
import axios from 'axios'
import classes from './allPosts.module.css';

const AllPosts = (props) => {
        const [allPostsState, setAllPostsState] = useState([])
        const [loading, setLoading] = useState(false)
        const currentUserUsername = sessionStorage.getItem("currentUserUsername")
        useEffect(async ()=>{
                setLoading(true)
               const {data} = await axios.post("/getAllPosts",{username: currentUserUsername, page: 1});
               setLoading(false)
               console.log(data)
               setAllPostsState(prevState => [...new Set([...prevState, ...data])]) //Issue of duplicacy
               console.log(allPostsState)
        },[])
        console.log(allPostsState) 
        return <Fragment>
            <div>
                <div classes={classes.post}>
                    {allPostsState.map((post,index) => {
                     return <>
                        <EachPost key={index} post={post}/>
                        </>
                    })
                    }
                </div>
                {loading && <p>Loading...</p>}
            </div>
        </Fragment>
}
export default AllPosts;