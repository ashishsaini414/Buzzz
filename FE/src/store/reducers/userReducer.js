const initialUsersState = {
    loginUser: {},
    myFriends: [],
    addFriend: {},
    allNotifications : []
}
const userReducer = (state = initialUsersState, action) => {
    switch(action.type){
        case "LOGIN_USER" : {
            console.log("test")
            return {...state, ...action.payload}
        }
        case "ADD_FRIEND": {
            return {...state.addFriend, ...action.payload}
        }
        case "ALL_NOTIFICATIONS":{
            //we will get all the users info. objects who sent the friend request to others
            return {...state, allNotifications: action.payload}
        }
        default: {
            return state
        } 
    }
}

export default userReducer;