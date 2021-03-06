import { LOGOUT } from '../actions/types';
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import questionReducer from './questionReducer';
import userReducer from './userReducer';
import teacherReducer from './teacherReducer';
import classroomReducer from './classroomReducer';
import quizInstanceReducer from './quizInstanceReducer';
import courseReducer from './courseReducer';
import studentReducer from './studentReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authReducer,
    quizReducer,
    questionReducer,
    userReducer,
    teacherReducer,
    classroomReducer,
    quizInstanceReducer,
    courseReducer,
    studentReducer,
});

export default (state, action) => rootReducer(action.type === LOGOUT ? undefined : state, action);
