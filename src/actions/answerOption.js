import {
    SAVE_ANSWER_OPTION_SUCCESS,
    SAVE_ANSWER_OPTION_FAIL,
} from "./types";

import { answerOptionApi } from '../api';

export const saveAnswerOption = (payload) => (dispatch) => {
    return answerOptionApi.saveAnswerOption(payload)
        .then(() => {
            dispatch({
                type: SAVE_ANSWER_OPTION_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: SAVE_ANSWER_OPTION_FAIL,
            });
        }
    );
};