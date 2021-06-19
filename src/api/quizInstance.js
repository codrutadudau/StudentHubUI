import axios from 'axios';

const API_URL = process.env.API_URL;

export const assignQuiz = (payload) => {
    return axios.post(API_URL + "/quiz_instances", { ...payload });
};

// export const editAnswer = (id, payload) => {
//     return axios.put(API_URL + "/answers/" + id, { ...payload });
// };

// export const deleteAnswer = (id) => {
//     return axios.delete(API_URL + "/answers/" + id);
// };
