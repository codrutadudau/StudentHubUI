import {
    GET_QUESTIONS
} from "./types";

import { questionApi } from '../api';

export const getAllQuestions = () => (dispatch) => {
    return questionApi.getAllQuestions()
        .then(response => {
            dispatch({
                type: GET_QUESTIONS,
                payload: { questions: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
