import classes from './Suggestions.module.css';
import { toast } from "react-toastify";
import { useState } from 'react';
import userLogo from '../Assets/Images/userlogo';


const EachSuggestion = (props) => {
    const {suggestion } = props;
    const [addFriendBoolean, setAddFriendBoolean] = useState(false)

    const currentUserUsername = sessionStorage.getItem("currentUserUsername");

    const addFriendHandler = (friend) => {
        fetch("/addFriend",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({loginUser: currentUserUsername, username:friend.username})
        }).then(res => res.json()).then(data => {
            // dispatch({type:"ADD_FRIEND", data: data});
              if(data === "You can't add Yourself"){
                toast.warn("You can't add Yourself")
              }
              else if(data === "User already added"){
                toast.warn("User already added")
              }
              else{
                toast.success(`${friend.name} added Successfully `)
                setAddFriendBoolean(true)
                props.addFriend(friend)

              }
            console.log(data)
        })
}

    

    return(
        <div className={classes.user}>
        <img src={suggestion.imageUrl} className={classes.userImage} onError={(e)=> { e.target.setAttribute("src",userLogo)}} alt=""></img>
        <p  className={classes.userName}>{suggestion.name}</p>
        {!addFriendBoolean ? <button className={classes.addUserButton} onClick={(event) => addFriendHandler(suggestion)} >Add</button>
        : <button >Added</button>}
        </div>
        )
}

export default EachSuggestion;