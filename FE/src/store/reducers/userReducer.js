const initialUsersState = {
    loginUser: {},
    myFriends: [],
    addFriend: {}
}
const userReducer = (state = {}, action) => {
    switch(action.type){
        case "LOGIN_USER" : {
            console.log("test")
            return {...state, ...action.payload}
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