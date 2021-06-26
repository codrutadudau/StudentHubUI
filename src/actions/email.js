
import {
    SEND_QUIZ_REMINDER_SUCCESS,
    SEND_QUIZ_REMINDER_FAIL,
} from "./types";

import { emailApi } from '../api';

export const sendEmail = (payload) => (dispatch) => {
    return emailApi.sendEmail(payload)
        .then(() => {
            dispatch({
                type: SEND_QUIZ_REMINDER_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: SEND_QUIZ_REMINDER_FAIL,
            });
        }
    );
};
