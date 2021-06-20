import axios from 'axios';

const API_URL = process.env.API_URL;

export const assignQuiz = (payload) => {
    return axios.post(API_URL + "/quiz_instances", { ...payload });
};

export const getQuizInstancesByUser = (id) => {
    return axios.get(API_URL + "/quiz_instances?user=" + id);
};

export const startQuiz = (id) => {
    return axios.put(API_URL + "/quiz_instances/" + id + "/start");
};

export const getQuizInstance = (id) => {
    return axios.get(API_URL + "/quiz_instances/" + id);
};
