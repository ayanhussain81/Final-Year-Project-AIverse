// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if any
});

export default rootReducer;
