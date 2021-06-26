import axios from 'axios';

const API_URL = process.env.API_URL;

export const sendEmail = (payload) => {
    return axios.post(API_URL + "/emails/send", { ...payload });
};
