import {
    GET_QUIZZES
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
