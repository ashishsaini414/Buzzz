import {createStore} from 'redux';
import rootReducer from './rootReducers';
import mymiddleware from './middlewares/middleware'
const store = createStore(rootReducer, mymiddleware)

export default store;