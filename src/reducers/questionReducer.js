import {
    GET_QUESTIONS,
    GET_QUESTIONS_BY_QUIZ,
    GET_QUESTION_BY_ID,
    GET_ANSWERS_BY_QUESTION_ID,
} from '../actions/types';

const initialState = {
    questions: null,
    question: null,
    quizQuestions: null,
    questionAnswers: null,
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
        case GET_ANSWERS_BY_QUESTION_ID:
            return {
                ...state,
                questionAnswers: payload.questionAnswers
            };
        default:
            return state;
    }
}
 
export default questionReducer;
