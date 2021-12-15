import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import classes from './Suggestions.module.css';

const Suggestions = () => {
    const dispatch = useDispatch()
    const [suggest, setSuggest] = useState([])
    console.log(suggest)
    const currentUserUsername = localStorage.getItem("currentUserUsername");

    useEffect(()=>{
        fetch("/getAllSuggestions")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setSuggest(data)
            // console.log(data)
        })
    },[])
    // console.log(suggest)
    const addFriendHandler = (data) => {
            fetch("/addFriend",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({loginUser: currentUserUsername, username:data.username})
            }).then(res => res.json()).then(data => dispatch({type:"ADD_FRIEND", data: data}))
    }
  return <Fragment>
      <div>
          {suggest.map(data => {
              return(
              <div className={classes.user}>
              <img src={data.imageUrl} className={classes.userImage} alt=""></img>
              <p  className={classes.userName}>{data.name}</p>
              <button className={classes.addUser} onClick={(event) => addFriendHandler(data)} >Add</button>
              </div>
              )
          })}
      </div>
  </Fragment>
};

export default Suggestions;
