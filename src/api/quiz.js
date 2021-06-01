import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllQuizzes = () => {
    return axios.get(API_URL + "/quizzes");
};

export const getQuizById = (id) => {
    return axios.get(API_URL + "/quizzes/" + id);
};
