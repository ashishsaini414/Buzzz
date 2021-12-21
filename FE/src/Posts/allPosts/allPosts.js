import { Fragment, useEffect, useState } from "react";
import EachPost from "./EachPost/eactPost";
import axios from "axios";
import classes from "./allPosts.module.css";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const AllPosts = (props) => {
  const [allPostsState, setAllPostsState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNextPageNumber, setIsNextPageNumber] = useState(1)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const currentUserUsername = sessionStorage.getItem("currentUserUsername");

  const dispatch = useDispatch();
  const allPostsDataFromRedux = useSelector(state => state.posts.allposts)
  console.log(allPostsDataFromRedux)

  if(allPostsState === []){
    setHasMorePosts(false)
  }
    useEffect(async () => {
        setLoading(true);
        const { data } = await axios.post("/getAllPosts", {
        username: currentUserUsername,
        page: isNextPageNumber,
        });
        setLoading(false);
        // console.log(data);
        dispatch({type: "ADD_NEW_POSTS", payload: data})

        if(data.length === 0){
            setHasMorePosts(false)
        }
        // setAllPostsState((prevState) => [...prevState, ...data]); //Issue of duplicacy
        // console.log(allPostsState);
    }, [isNextPageNumber]);

  console.log(allPostsState);

  console.log("data")
  const fetchData = () => {
      console.log("test")
      setIsNextPageNumber(prev => prev + 1)
  }
 
  return (
    <Fragment>
      <div>
        <div classes={classes.post}>
          <InfiniteScroll
            dataLength={allPostsDataFromRedux.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMorePosts}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {allPostsDataFromRedux.map((post, index) => {
            return (
              <>
                <EachPost key={index} post={post} />
              </>
            );
          })}
          </InfiniteScroll>
          
        </div>
        {/* {loading && <p>Loading...</p>} */}
      </div>
    </Fragment>
  );
};
export default AllPosts;
