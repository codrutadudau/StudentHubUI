import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllQuestions = () => {
    return axios.get(API_URL + "/questions");
};

export const getQuestionsByQuizId = (id) => {
    return axios.get(API_URL + "/questions/quiz/" + id);
};

export const createQuestion = (payload) => {
    return axios.post(API_URL + "/questions", { ...payload });
};

export const editQuestion = (id, payload) => {
    return axios.put(API_URL + "/questions/" + id, { ...payload });
};

export const deleteQuestion = (id) => {
    return axios.delete(API_URL + "/questions/" + id);
};

