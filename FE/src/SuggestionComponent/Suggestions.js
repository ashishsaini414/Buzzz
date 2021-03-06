import { Fragment, useEffect, useState } from "react";
import EachSuggestion from "./eachSuggestion";
import { useDispatch, useSelector } from "react-redux";
import classes from "./suggestions.module.css";
import axios from "axios";

const Suggestions = (props) => {
  const [showSearchInput, setShowSearchHandler] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const currentUserUsername = localStorage.getItem("currentUserUsername");

  // console.log(searchText);
  // console.log(filteredSuggestions);

  const dispatch = useDispatch();
  const mySuggestions = useSelector((state) => state.users.mySuggestions);
  // console.log(mySuggestions)

  useEffect(() => {
    fetch("/getAllSuggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginUser: currentUserUsername }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SAVE_ALL_SUGGESTIONS", payload: data });
      });
  }, [currentUserUsername, dispatch]);

  useEffect(() => {
    const timeoutDelay = setTimeout(async () => {
      const { data } = await axios.post("/getFilteredSuggestion", {
        loginUser: currentUserUsername,
        inputText: searchText,
      });
      // console.log(data);
      setFilteredSuggestions(data);
    }, 500);
    return () => clearTimeout(timeoutDelay);
  }, [searchText, currentUserUsername]);

  const searchHandler = async (e) => {
    if (e.target.value !== "") {
      setSearchText(e.target.value);
    }
    if (e.target.value === "") {
      setSearchText("");
      setFilteredSuggestions(mySuggestions);
    }
  };

  return (
    <Fragment>
      <div className={classes.suggestionsComponent}>
        <div className={classes.suggestionHeader}>
          <h2 className={classes.suggestionTitle}>Suggestions</h2>
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
          {filteredSuggestions.length === 0 && <p className={classes.noSuggestionMessage}>No Suggestions</p>}
          {filteredSuggestions.map((data, index) => {
            return (
              <div key={index}>
                <EachSuggestion suggestion={data} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Suggestions;
