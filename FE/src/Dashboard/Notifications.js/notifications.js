import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EachFriendRequestNotification from './eachFriendRequestNotification';
import classes from './notifications.module.css';


const NotificationIcon = () => {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const currentUserUsername = sessionStorage.getItem("currentUserUsername")
  const dispatch = useDispatch();
  const selector = useSelector(state => state.users.allNotifications);
  console.log(selector)
//   console.log(currentUserUsername)
        useEffect(()=>{
        async function getAllNotifications(){
              const response = await fetch("/getAllNotifications",{
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({loginUser: currentUserUsername})
                })
              const result = await response.json();
              console.log("///",result);
              dispatch({type: "ALL_NOTIFICATIONS", payload: result})
            }
            getAllNotifications();
        },[currentUserUsername, dispatch])

    const notificationHandler = () => {
        setShowNotificationPanel(prevState => !prevState)
    }
    return <div>
            <span className={classes.notificationIcon} onClick={notificationHandler}><i className="fas fa-bell"></i></span>
          {showNotificationPanel ? <div className={classes.notificationList}>
            <div>
                {
                    selector.allFriendRequests.map((notification,index) =>{
                        return <div key={index}><EachFriendRequestNotification notification = {notification}/></div>
                    })
                }
            </div>
          </div>: ""}
    </div>
}
export default NotificationIcon;