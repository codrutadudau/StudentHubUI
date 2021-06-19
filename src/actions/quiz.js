import {
    GET_QUIZZES,
    GET_QUIZ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL,
    EDIT_QUIZ_SUCCESS,
    EDIT_QUIZ_FAIL,
    DELETE_QUIZ,
    ADD_QUIZ_QUESTION_SUCCESS,
    ADD_QUIZ_QUESTION_FAIL,
    DELETE_QUIZ_QUESTION_SUCCESS,
    DELETE_QUIZ_QUESTION_FAIL
} from "./types";

import { quizApi } from '../api';

export const getAllQuizzes = (id = null) => async(dispatch) => {
    return quizApi.getAllQuizzes(id)
        .then(response => {
            dispatch({
                type: GET_QUIZZES,
                payload: { quizzes: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getQuizById = (id) => (dispatch) => {
    return quizApi.getQuizById(id)
        .then(response => {
            dispatch({
                type: GET_QUIZ,
                payload: { quiz: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const createQuiz = (payload) => (dispatch) => {
    return quizApi.createQuiz(payload)
        .then(() => {
            dispatch({
                type: CREATE_QUIZ_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: CREATE_QUIZ_FAIL,
            });
        }
    );
};

export const addQuizQuestion = (id, payload) => (dispatch) => {
    return quizApi.addQuizQuestion(id, payload)
        .then(() => {
            dispatch({
                type: ADD_QUIZ_QUESTION_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: ADD_QUIZ_QUESTION_FAIL,
            });
        }
    );
};

export const deleteQuizQuestion = (id, questionId) => (dispatch) => {
    return quizApi.deleteQuizQuestion(id, questionId)
        .then(() => {
            dispatch({
                type: DELETE_QUIZ_QUESTION_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: DELETE_QUIZ_QUESTION_FAIL,
            });
        }
    );
};

export const editQuiz = (id, payload) => (dispatch) => {
    return quizApi.editQuiz(id, payload)
        .then(() => {
            dispatch({
                type: EDIT_QUIZ_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: EDIT_QUIZ_FAIL,
            });
        }
    );
};

export const deleteQuiz = (id) => (dispatch) => {
    return quizApi.deleteQuiz(id)
        .then(() => {
            dispatch({
                type: DELETE_QUIZ,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
