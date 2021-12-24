import classes from './eachSuggestions.module.css';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import userLogo from '../Assets/Images/userlogo';


const EachSuggestion = (props) => {
    const { suggestion } = props;
    console.log("////",suggestion)
    const [addFriendBoolean, setAddFriendBoolean] = useState(false)
    const currentUserUsername = sessionStorage.getItem("currentUserUsername");

    useEffect(()=>{
      if(!suggestion.notifications.friendsRequest.includes(currentUserUsername)){
        setAddFriendBoolean(prevState => !prevState)
      }
    },[])

    const addFriendHandler = (friend) => {
        fetch("/addFriend",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({loginUser: currentUserUsername, friendUser:friend.username})
        }).then(res => res.json()).then(data => {

          console.log(data)
            // dispatch({type:"ADD_FRIEND", data: data});
              // if(data === "You can't add Yourself"){
              //   toast.warn("You can't add Yourself")
              // }
              // else if(data === "User already added"){
              //   toast.warn("User already added")
              // }
              // else{
              //   toast.success(`${friend.name} added Successfully `)
                setAddFriendBoolean(prevState => !prevState)
              //   props.addFriend(friend)

              // }
        })
}
    return(
        <div className={classes.user}>
          <img src={suggestion.imageUrl} className={classes.userImage} onError={(e)=> { e.target.setAttribute("src",userLogo)}} alt=""></img>
          <p  className={classes.userName}>{suggestion.name}</p>
          {addFriendBoolean ? <button className={classes.addUserButton} onClick={(event) => addFriendHandler(suggestion)} >Add</button>
          : <button className={classes.addUserButton}>Request Sent</button>}
        </div>
        )
}

export default EachSuggestion;