import { Fragment, useEffect } from "react";
import EachSuggestion from "./eachSuggestion";
import { useDispatch, useSelector } from "react-redux";

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
      <div>
          {mySuggestions.map((data, index) => {
              return(
                <div key={index}>
                  <EachSuggestion suggestion = {data} />
                </div>
              )
          })}
      </div>
  </Fragment>
};

export default Suggestions;
