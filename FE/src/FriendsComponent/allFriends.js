import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EachFriend from "./eachFriend";
import axios from "axios";
import classes from "./allFriends.module.css";

const MyFriends = (props) => {
  const dispatch = useDispatch();
  const [showSearchInput, setShowSearchHandler] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const myFriends = useSelector((state) => state.users.allFriends);
  const currentUserUsername = localStorage.getItem("currentUserUsername");

  // console.log(filteredFriends);
  // console.log(searchText);

  useEffect(() => {
    fetch("/getAllFriends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginUser: currentUserUsername }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SAVE_ALL_FRIENDS", payload: data });
      });
  }, [currentUserUsername, dispatch]);

  useEffect(() => {
    const timeoutDelay = setTimeout(async () => {
      const { data } = await axios.post("/getFilteredFriends", {
        loginUser: currentUserUsername,
        inputText: searchText,
      });

      setFilteredFriends(data);
    }, 500);
    return () => clearTimeout(timeoutDelay);
  }, [searchText, currentUserUsername]);

  const searchHandler = async (e) => {
    if (e.target.value !== "") {
      setSearchText(e.target.value);
    }
    if (e.target.value === "") {
      setSearchText("");
      setFilteredFriends(myFriends);
    }
  };

  return (
    <Fragment>
      <div className={classes.suggestionsComponent}>
        <div className={classes.suggestionHeader}>
          <h2 className={classes.suggestionTitle}>Contacts</h2>
          <span
            className={classes.searchIcon}
            onClick={(e) => setShowSearchHandler((prevState) => !prevState)}
          >
            <i className="fas fa-search"></i>
          </span>
        </div>
        {showSearchInput && (
          <div>
            <input
              className={classes.searchInput}
              placeholder="Enter Text ..."
              onChange={searchHandler}
            />
          </div>
        )}
        <div className={classes.suggestionList}>
          {filteredFriends.length === 0 && <p className={classes.noFriendsMessage}>No Friends</p>}
          {filteredFriends.map((friend, index) => {
            return (
              <div key={index}>
                <EachFriend data={friend} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default MyFriends;
