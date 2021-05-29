import axios from 'axios';

const API_URL = process.env.API_URL;

export const signIn = (email, password) => {
    return axios
        .post(API_URL + "/login", { email, password })
        .then(function (response) {
            sessionStorage.setItem('token', response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
