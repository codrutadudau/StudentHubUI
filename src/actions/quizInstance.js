
import {
    ASSIGN_QUIZ_SUCCESS,
    ASSIGN_QUIZ_FAIL,
    GET_USER_QUIZ_INSTANCES,
    START_QUIZ_SUCCESS,
    START_QUIZ_FAIL,
    GET_QUIZ_INSTANCE,
    FINISH_QUIZ,
    GET_FINISHED_QUIZ_INSTANCE,
} from "./types";

import { quizInstanceApi } from '../api';

export const assignQuiz = (payload) => (dispatch) => {
    return quizInstanceApi.assignQuiz(payload)
        .then((response) => {
            dispatch({
                type: ASSIGN_QUIZ_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: ASSIGN_QUIZ_FAIL,
            });
        }
    );
};

export const getQuizInstancesByUser = (id) => (dispatch) => {
    return quizInstanceApi.getQuizInstancesByUser(id)
        .then(response => {
            dispatch({
                type: GET_USER_QUIZ_INSTANCES,
                payload: { quizzes: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const startQuiz = (id) => (dispatch) => {
    return quizInstanceApi.startQuiz(id)
        .then(() => {
            dispatch({
                type: START_QUIZ_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: START_QUIZ_FAIL,
            });
        }
    );
};

export const finishQuiz = (id, payload) => (dispatch) => {
    return quizInstanceApi.finishQuiz(id, payload)
        .then(() => {
            dispatch({
                type: FINISH_QUIZ,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getQuizInstance = (id) => (dispatch) => {
    return quizInstanceApi.getQuizInstance(id)
        .then((response) => {
            dispatch({
                type: GET_QUIZ_INSTANCE,
                payload: { quizInstance: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getFinishedQuizInstance = (id) => (dispatch) => {
    return quizInstanceApi.getFinishedQuizInstance(id)
        .then((response) => {
            dispatch({
                type: GET_FINISHED_QUIZ_INSTANCE,
                payload: { finishedQuizInstance: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
