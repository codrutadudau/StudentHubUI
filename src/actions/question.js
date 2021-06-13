import {
    GET_QUESTIONS,
    GET_QUESTIONS_BY_QUIZ,
    GET_QUESTION_BY_ID,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAIL,
    EDIT_QUESTION_SUCCESS,
    EDIT_QUESTION_FAIL,
    DELETE_QUESTION,
    GET_ANSWERS_BY_QUESTION_ID,
} from "./types";
import isEmpty from 'lodash/isEmpty';

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

export const getQuestionsByQuizId = (id) => (dispatch) => {
    return questionApi.getQuestionsByQuizId(id)
        .then(response => {
            dispatch({
                type: GET_QUESTIONS_BY_QUIZ,
                payload: { questions: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getQuestionById = (id) => (dispatch) => {
    return questionApi.getQuestionById(id)
        .then(response => {
            dispatch({
                type: GET_QUESTION_BY_ID,
                payload: { question: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const createQuestion = (payload, answersPayload = null) => (dispatch) => {
    return questionApi.createQuestion(payload)
        .then((response) => {
            dispatch({
                type: CREATE_QUESTION_SUCCESS,
            });

            if (!isEmpty(answersPayload.answers)) {
                questionApi.addQuestionAnswers(response.data.id, answersPayload);
            }
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: CREATE_QUESTION_FAIL,
            });
        }
    );
};

export const editQuestion = (id, payload) => (dispatch) => {
    return questionApi.editQuestion(id, payload)
        .then(() => {
            dispatch({
                type: EDIT_QUESTION_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: EDIT_QUESTION_FAIL,
            });
        }
    );
};

export const deleteQuestion = (id) => (dispatch) => {
    return questionApi.deleteQuestion(id)
        .then(() => {
            dispatch({
                type: DELETE_QUESTION,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getAnswersByQuestionId = (id) => (dispatch) => {
    return questionApi.getQuestionAnswers(id)
        .then(response => {
            dispatch({
                type: GET_ANSWERS_BY_QUESTION_ID,
                payload: { questionAnswers: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
