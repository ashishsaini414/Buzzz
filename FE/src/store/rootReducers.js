import {combineReducers} from 'redux';
import postReducer from './reducers/postReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    users: userReducer,
    posts: postReducer
})

export default rootReducer;