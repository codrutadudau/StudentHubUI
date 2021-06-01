import axios from 'axios';

const API_URL = process.env.API_URL;

export const signIn = (email, password) => {
    // use .create() to not be intercepted
    return axios.create()
        .post(API_URL + "/login", { email, password })
        .then(function (response) {
            sessionStorage.setItem('token', response.data);

            return response.data;
        });
};

export const signUp = (firstName, lastName, email, password, passwordConfirm, phoneNumber) => {
    return axios.create()
        .post(API_URL + "/signup", { firstName, lastName, email, password, passwordConfirm, phoneNumber })
        .then(function (response) {
            return response.data;
        });
};
