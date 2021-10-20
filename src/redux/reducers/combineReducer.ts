import { combineReducers } from 'redux';
import { UserReducer } from './UserReducer';


const rootReducer = combineReducers({
  userInfo: UserReducer,
});

export default rootReducer;