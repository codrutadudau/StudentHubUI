  
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import questionReducer from './questionReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authReducer,
    quizReducer,
    questionReducer
});

export default rootReducer;
