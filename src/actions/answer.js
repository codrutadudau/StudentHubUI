
import {
    EDIT_ANSWER_SUCCESS,
    EDIT_ANSWER_FAIL,
    DELETE_ANSWER,
    CREATE_ANSWER_SUCCESS,
    CREATE_ANSWER_FAIL,
} from "./types";

import { answerApi } from '../api';

export const createAnswer = (payload) => (dispatch) => {
    return answerApi.createAnswer(payload)
        .then((response) => {
            dispatch({
                type: CREATE_ANSWER_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: CREATE_ANSWER_FAIL,
            });
        }
    );
};

export const editAnswer = (id, payload) => (dispatch) => {
    return answerApi.editAnswer(id, payload)
        .then(() => {
            dispatch({
                type: EDIT_ANSWER_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: EDIT_ANSWER_FAIL,
            });
        }
    );
};

export const deleteAnswer = (id) => (dispatch) => {
    return answerApi.deleteAnswer(id)
        .then(() => {
            dispatch({
                type: DELETE_ANSWER,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
