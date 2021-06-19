import {
    GET_QUIZZES,
    GET_QUIZ,
    GET_TEACHER_QUIZZES,
} from '../actions/types';

const initialState = {
    quizzes: null,
    quiz: null
};

const quizReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_QUIZZES:
        case GET_TEACHER_QUIZZES:
            return {
                ...state,
                quizzes: payload.quizzes
            };
        case GET_QUIZ:
            return {
                ...state,
                quiz: payload.quiz
            };
        default:
            return state;
    }
}
 
export default quizReducer;
