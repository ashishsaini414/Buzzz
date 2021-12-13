const initialUsersState = {
    loginUser: {},
    myFriends: []
}
const userReducer = (state = initialUsersState, action) => {
    switch(action.type){
        case "LOGIN_USER" : {
            return {...action.data}
        }
        case "ADD_FRIEND": {
            return [...initialUsersState.myFriends, action.data]
        }
        default: {
            return state
        } 
    }
}

export default userReducer;