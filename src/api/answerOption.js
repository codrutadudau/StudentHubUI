import axios from 'axios';

const API_URL = process.env.API_URL;

export const saveAnswerOption = (payload) => {
    return axios.post(API_URL + "/answer_options", { ...payload });
};
