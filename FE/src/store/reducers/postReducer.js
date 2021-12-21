
// const initialState = {
    
// }
const postReducer = (state = [],action) => {
    switch(action.type){
        case "ADD_NEW_POSTS" : {
            return [...state, ...action.payload]
        }
        case "UPDATE_LIKE_DISLIKE":{
            const newpost = state.filter((post,index) => {
                if(post._id === action.payload._id){
                    state.splice(index,1,action.payload)
                }
            })
            return [...state]
        }
        case "LOAD_ALL_POST_COMMENTS":{
            
        }
        default: {
            return state
        }
    }
}

export default postReducer;