const initialState = {
    loginUserInfo: {}
}

const authReducer = (state = initialState, action) => {
        switch(action.type){
            case "LOGIN_USER": {
                localStorage.setItem("authDetails",JSON.stringify(action.payload))
                return {...state}
            }
            default: {
                return state
            }
        }
}
export default authReducer;