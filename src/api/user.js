import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllUsers = () => {
    return axios.get(API_URL + "/users");
};

export const getUserById = (id) => {
    return axios.get(API_URL + "/users/" + id);
};

export const getUserMe = () => {
    return axios.get(API_URL + "/users/me");
};

export const enableUser = (id) => {
    return axios.put(API_URL + "/users/" + id + "/enable");
};
