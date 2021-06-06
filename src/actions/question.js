import {
    GET_QUESTIONS,
    GET_QUESTIONS_BY_QUIZ
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
