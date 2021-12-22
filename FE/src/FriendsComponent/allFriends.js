import { Fragment, useEffect } from "react"
import { useState } from "react";
import EachFriend from "./eachFriend";

const MyFriends = (props) => {
    const { addFriend} = props;
    const [myFriends, setMyFriends] = useState([]);
    const [removedFriend, setRemovedFriend] = useState({})
    const currentUserUsername = sessionStorage.getItem("currentUserUsername");
    useEffect(()=>{
        fetch("/getAllFriends",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({loginUser: currentUserUsername})
        }).then(res => res.json()).then(data => setMyFriends(data))
    },[removedFriend, addFriend, currentUserUsername])
    
    const removeFriendHandler = (res) => {
        console.log(res)
        setRemovedFriend(res)
    }
        return <Fragment>
            <div>
                {myFriends.map((friend,index) => {
                  return <div key ={index} >
                   <EachFriend data={friend} removeFriend={removeFriendHandler} />
                </div>
                })
                }
            </div>
        </Fragment>
}

export default MyFriends