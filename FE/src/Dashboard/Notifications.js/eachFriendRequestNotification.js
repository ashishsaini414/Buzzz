import classes from './eachFriendRequestNotification.module.css';

const EachFriendRequestNotification = (props) => {
    const {notification} = props;
    console.log(notification)
    //here notification variable has the object of that person who send the friend request

    const currentUserUsername = sessionStorage.getItem("currentUserUsername");

    const friendRequestHandler = async () => {
        console.log(notification)
       const response =  await fetch("/acceptFriendRequest",{
           method: "POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({loginUser: currentUserUsername,friendWhoSentTheFriendRequest : notification.username})
       })
       const result = await response.json()
       console.log(result);
    }
        return <div className={classes.EachNotification}>
            <div className={classes.message}>
                <p>{`${notification.name} send you a friend request`}</p>
            </div>
            <button className={classes.AcceptButton} onClick={friendRequestHandler}>+Accept</button>
        </div>
}

export default EachFriendRequestNotification;