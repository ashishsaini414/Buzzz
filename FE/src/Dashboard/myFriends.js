import { Fragment, useEffect } from "react"
import { useState } from "react";
import { useSelector } from "react-redux";
const MyFriends = () => {

    const [myFriends, setMyFriends] = useState([]);
    const friends = useSelector(state => state.myFriends)
    console.log(friends)

    useEffect(()=>{
        fetch("/getAllFriends").then(res => res.json()).then(data => setMyFriends(data))
    },[friends])

    const removeFriendHandler = (data) => {
        fetch("/removeFriend",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        // console.log(data)
    }
        return <Fragment>
            <div >
                {myFriends.map(friend => <p onClick={()=>removeFriendHandler(friend)}>{friend.name}</p>)}
            </div>
        </Fragment>
}

export default MyFriends