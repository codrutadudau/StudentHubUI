  
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authReducer,
    quizReducer
});

export default rootReducer;
