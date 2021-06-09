import {
    GET_QUESTIONS,
    GET_QUESTIONS_BY_QUIZ,
    GET_QUESTION_BY_ID
} from '../actions/types';

const initialState = {
    questions: null,
    question: null,
    quizQuestions: null
};

const questionReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: payload.questions
            };
        case GET_QUESTIONS_BY_QUIZ:
            return {
                ...state,
                quizQuestions: payload.questions
            };
        case GET_QUESTION_BY_ID:
            return {
                ...state,
                question: payload.question
            };
        default:
            return state;
    }
}
 
export default questionReducer;
