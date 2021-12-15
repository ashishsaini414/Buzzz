import { Fragment } from "react";
import classes from './friendsComponent.module.css';
const FriendsComponent = (props) => {
    const currentUserUsername = localStorage.getItem("currentUserUsername");
    const removeFriendHandler = async (friend)=>{
        console.log(friend)
        await fetch("/removeFriend",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ loginUser: currentUserUsername, username: friend.username})
        }).then(res => res.json()).then((response)=>{
            console.log(response)
        })
    }
  return (
    <Fragment>
      {props.data.map((friend) => (
        <div className={classes.userFriends}>
          <img src={friend.imageUrl} className={classes.userImageLink} alt="" ></img>
          <p>{friend.name}</p>
          <button className={classes.removeUser} onClick={()=> removeFriendHandler(friend)} >Remove</button>
        </div>
      ))}
    </Fragment>
  );
};

export default FriendsComponent;
