import {
    GET_USER_QUIZ_INSTANCES,
    GET_QUIZ_INSTANCE,
    GET_FINISHED_QUIZ_INSTANCE,
} from '../actions/types';

const initialState = {
    quizzes: null,
    quizInstance: null,
    finishedQuizInstance: null,
};

const quizInstanceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_QUIZ_INSTANCES:
            return {
                ...state,
                quizzes: payload.quizzes
            };
        case GET_QUIZ_INSTANCE:
            return {
                ...state,
                quizInstance: payload.quizInstance
            };
        case GET_FINISHED_QUIZ_INSTANCE:
            return {
                ...state,
                finishedQuizInstance: payload.finishedQuizInstance
            };
        default:
            return state;
    }
}
 
export default quizInstanceReducer;
