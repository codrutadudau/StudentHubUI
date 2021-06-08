import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllQuizzes = () => {
    return axios.get(API_URL + "/quizzes");
};

export const getQuizById = (id) => {
    return axios.get(API_URL + "/quizzes/" + id);
};

export const createQuiz = (payload) => {
    return axios.post(API_URL + "/quizzes", { ...payload });
};

export const addQuizQuestion = (id, payload) => {
    return axios.post(API_URL + "/quizzes/" + id + "/question", { ...payload });
};

export const editQuiz = (id, payload) => {
    return axios.put(API_URL + "/quizzes/" + id, { ...payload });
};

export const deleteQuiz = (id) => {
    return axios.delete(API_URL + "/quizzes/" + id);
};
