import {
    GET_QUIZZES,
    GET_QUIZ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL
} from "./types";

import { quizApi } from '../api';

export const getAllQuizzes = () => async(dispatch) => {
    return quizApi.getAllQuizzes()
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
