const initialUsersState = {
    loginUser: {},
    myFriends: [],
    addFriend: {}
}
const userReducer = (state = initialUsersState, action) => {
    switch(action.type){
        case "LOGIN_USER" : {
            console.log("test")
            return {...state, loginUser: action.data}
        }
        case "ADD_FRIEND": {
            return {...state.addFriend, ...action.payload}
        }
        default: {
            return state
        } 
    }
}

export default userReducer;