import { Fragment, useEffect } from "react"
import { useState } from "react";
import { useSelector } from "react-redux";
import FriendsComponent from "./friendsComponent";
const MyFriends = (props) => {

    const [myFriends, setMyFriends] = useState([]);
    const loginUser = useSelector(state => state.loginUser)

    useEffect(()=>{
        fetch("/getAllFriends",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginUser.email)
        }).then(res => res.json()).then(data => setMyFriends(data))
    },[])

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
                <FriendsComponent data = {myFriends}/>
            </div>
        </Fragment>
}

export default MyFriends