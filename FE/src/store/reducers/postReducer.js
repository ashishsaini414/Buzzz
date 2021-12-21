
const initialState = {
    allposts: [],
    postComments: []
}
const postReducer = (state = initialState,action) => {
    switch(action.type){
        case "ADD_NEW_POSTS" : {
            console.log(action.payload)
            return {...state, allposts: [...state.allposts, ...action.payload]}
        }
        case "UPDATE_LIKE_DISLIKE":{
        }
        case "LOAD_POST_COMMENTS":{
            return {...state, postComments: [...action.payload]}
        }
        default: {
            return state
        }
    }
}

export default postReducer;