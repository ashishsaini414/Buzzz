import { Fragment, useEffect, useState } from "react";
import EachPost from "./EachPost/eachPost";
import axios from "axios";
import classes from "./allPosts.module.css";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Moderator from "../../Moderator";
import Loader from "../../Assets/Loader/loader";

const AllPosts = (props) => {

  const [isNextPageNumber, setIsNextPageNumber] = useState(1)
  const [isModeratorModeON, setIsModeratorModeON] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const currentUserUsername = localStorage.getItem("currentUserUsername");

  const dispatch = useDispatch();

  const allPostsDataFromRedux = useSelector(state => state.posts.allposts)
  const allReportedPostsDataFromRedux = useSelector(state => state.posts.reportedPosts)

  // console.log(allPostsDataFromRedux);
  // console.log(allReportedPostsDataFromRedux);

    useEffect(() => {
      //-------fetch all posts
      async function fetchPosts(){
        const { data } = await axios.post("/getAllPosts", {
        username: currentUserUsername,
        page: isNextPageNumber,
        });
        // console.log(data)
        dispatch({type: "DELETE_ALL_SAVED_REPORTED_POSTS"})
        dispatch({type: "ADD_NEW_POSTS", payload: data})

        if(data.length === 0){
            setHasMorePosts(false)
        }
      }
      //-------fetch reported posts
      async function fetchReportedPosts(){
        const ReportedPostsdata = await axios.post("/getAllReportedPosts",{
          page: isNextPageNumber,
      });
      // console.log(ReportedPostsdata.data)
      dispatch({type: "SAVE_REPOTED_POST", payload: ReportedPostsdata.data});
      dispatch({type: "DELETE_ALL_SAVED_POSTS"});

      if(ReportedPostsdata.data.length === 0){
        setHasMorePosts(false)
      }

      // console.log(ReportedPostsdata);

      }

      //-----connditions for functions
        if(!isModeratorModeON){
          fetchPosts()
        }
        else if(isModeratorModeON){
          fetchReportedPosts();
        }
    }, [isNextPageNumber,currentUserUsername,dispatch,isModeratorModeON]);

  const fetchData = () => {
      setIsNextPageNumber(prev => prev + 1)
  }

  const moderatorHandler = (condition) => {
    // console.log(condition);
    if(condition){
      setIsModeratorModeON(condition);
      setHasMorePosts(true)
      setIsNextPageNumber(1)
    }
    if(!condition){
      setIsModeratorModeON(condition);
      setHasMorePosts(true)
      setIsNextPageNumber(1);
    }
  }

  const sortBy = (e) => {
    if(e.target.value === "Bottom"){
      dispatch({type: "POST_SORT_BY_BOTTOM"})
    }
    if(e.target.value === "Top"){
      dispatch({type: "POST_SORT_BY_TOP"})
    }
  }

  return (
    <Fragment>
      <div>
        <div className={classes.postsOptions}>
          <div className={classes.sortBy}>
            <p>Sort By:</p>
            <select onChange={(e)=> sortBy(e)} className={classes.sortOptionsList}>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
            </select>
          </div>
          {
            currentUserUsername === process.env.REACT_APP_MODERATOR_USERNAME && <Moderator isModeratorModeON = {moderatorHandler}/>
          }
        </div>
        <div classes={classes.post}>
          <InfiniteScroll
            dataLength={ isModeratorModeON ? allReportedPostsDataFromRedux.length : allPostsDataFromRedux.length } //This is important field to render the next data
            next={fetchData}
            hasMore={hasMorePosts}
            loader={<h2 className={classes.loader}><Loader/></h2>}
            endMessage={
              <div className={classes.endMessage}>
                {
                  allReportedPostsDataFromRedux.length === 0 && allPostsDataFromRedux.length === 0 ? <b> No posts</b> : <b>Yay! You have seen it all</b>
                }
              </div>
            }
          >
            { isModeratorModeON ? 
            allReportedPostsDataFromRedux.map((post, index) => {
            return (
              <div key={index}>
                <EachPost post={post} moderatorMode={isModeratorModeON} />
              </div>
            );
          }) 
          : 
          allPostsDataFromRedux.map((post, index) => {
            return (
              <div key={index}>
                <EachPost post={post} />
              </div>
            );
          })
          }
          </InfiniteScroll>
          
        </div>
      </div>
    </Fragment>
  );
};
export default AllPosts;
