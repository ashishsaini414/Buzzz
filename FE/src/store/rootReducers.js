import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    loginUser: userReducer
})

export default rootReducer;