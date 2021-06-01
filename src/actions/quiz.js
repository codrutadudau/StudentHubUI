import {
    GET_QUIZZES,
    GET_QUIZ
} from "./types";

import { quizApi } from '../api';

export const getAllQuizzes = () => (dispatch) => {
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
