const initialUsersState = {
    loginUser: {},
    myFriends: []
}
const userReducer = (state = initialUsersState, action) => {
    switch(action.type){
        case "LOGIN_USER" : {
            // console.log(action.data)
            state.myFriends.push(action.data)
            // console.log("nnknj"+ initialUsersState);
            return {...state.myFriends}
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