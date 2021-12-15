import { Fragment, useEffect } from "react"
import { useState } from "react";
import { useSelector } from "react-redux";
import FriendsComponent from "./friendsComponent";
const MyFriends = (props) => {

    const [myFriends, setMyFriends] = useState([]);
    const loginUser = useSelector(state => state.loginUser)
    const currentUserUsername = localStorage.getItem("currentUserUsername");
    useEffect(()=>{
        fetch("/getAllFriends",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({loginUser: currentUserUsername})
        }).then(res => res.json()).then(data => setMyFriends(data))
    },[])
    console.log(myFriends)
        return <Fragment>
            <div >
                <FriendsComponent data = {myFriends}/>
            </div>
        </Fragment>
}

export default MyFriends