import { Fragment, useEffect } from "react";
import EachSuggestion from "./eachSuggestion";
import { useDispatch, useSelector } from "react-redux";
import classes from './suggestions.module.css';

const Suggestions = (props) => {

    const currentUserUsername = sessionStorage.getItem("currentUserUsername");

    const dispatch = useDispatch();
    const mySuggestions = useSelector(state => state.users.mySuggestions)

    useEffect(()=>{
        fetch("/getAllSuggestions",{
          method: "POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({loginUser: currentUserUsername})
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch({type: "SAVE_ALL_SUGGESTIONS", payload: data})
        })
    },[currentUserUsername, dispatch])

  return <Fragment>
      <div className={classes.suggestionsComponent}>
          <div className={classes.suggestionHeader}>
            <h2 className={classes.suggestionTitle}>Suggestions</h2>
            <span className={classes.searchIcon}><i className="fas fa-search"></i></span>
          </div>
          <div className={classes.suggestionList}>
          {mySuggestions.map((data, index) => {
              return(
                <div key={index}>
                  <EachSuggestion suggestion = {data} />
                </div>
              )
          })}
          </div>      
      </div>
  </Fragment>
};

export default Suggestions;
