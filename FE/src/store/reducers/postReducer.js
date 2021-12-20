
const postReducer = (state = [],action) => {
    switch(action.type){
        case "ADD_NEW_POSTS" : {
            return [...state, ...action.payload]
        }
        default: {
            return state
        }
    }
}

export default postReducer;