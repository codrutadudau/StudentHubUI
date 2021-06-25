import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllStudentsWithName = () => {
    return axios.get(API_URL + "/user_students/name");
};
