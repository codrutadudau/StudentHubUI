import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllQuestions = () => {
    return axios.get(API_URL + "/questions");
};

export const getQuestionsByQuizId = (id) => {
    return axios.get(API_URL + "/questions/quiz/" + id);
};
