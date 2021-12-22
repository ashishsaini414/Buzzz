import { Fragment } from "react";
import classes from './eachFriendComponent.module.css';
import { toast } from 'react-toastify';
import { useState } from "react";
import userLogo from '../Assets/Images/userlogo';

const FriendsComponent = (props) => {
  const { data } = props;

    const currentUserUsername = sessionStorage.getItem("currentUserUsername");

    const removeFriendHandler = async (friend)=>{
        console.log(friend)
        await fetch("/removeFriend",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ loginUser: currentUserUsername, username: data.username})
        }).then(res => res.json()).then((response)=>{
            console.log(response)
            if(response === "Already removed"){
              toast.error("Already removed")
            }else{
              toast.success(`${friend.name} removed Successfully `)
              props.removeFriend(friend)
              // dispatch({type: "ADD_FRIEND", payload: friend})
            }
        })
    }
  return (
    <Fragment>
        <div className={classes.user}>
          <img src={data.imageUrl} className={classes.userImage} onError={(e)=> e.target.setAttribute("src", userLogo)} alt="" ></img>
          <p className={classes.userName}>{data.name}</p>
          <button className={classes.removeButton} onClick={()=> removeFriendHandler(data)} >Remove</button>
        </div>
    </Fragment>
  );
};

export default FriendsComponent;
