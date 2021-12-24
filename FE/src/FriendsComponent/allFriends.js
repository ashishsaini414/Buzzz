import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import EachFriend from "./eachFriend";

const MyFriends = (props) => {

    const dispatch = useDispatch();
    const myFriends = useSelector(state => state.users.allFriends)
    const currentUserUsername = sessionStorage.getItem("currentUserUsername");
    
    useEffect(()=>{
        fetch("/getAllFriends",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({loginUser: currentUserUsername})
        }).then(res => res.json()).then(data => {
            dispatch({type:"SAVE_ALL_FRIENDS", payload: data})
        })
    },[currentUserUsername,dispatch])
        return <Fragment>
            <div>
                {myFriends.map((friend,index) => {
                  return <div key ={index} >
                   <EachFriend data={friend} />
                </div>
                })
                }
            </div>
        </Fragment>
}

export default MyFriends