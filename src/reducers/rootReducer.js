import { LOGOUT } from '../actions/types';
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import questionReducer from './questionReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authReducer,
    quizReducer,
    questionReducer,
    userReducer
});

export default (state, action) => rootReducer(action.type === LOGOUT ? undefined : state, action);
