import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from "./types";

import { authApi } from '../api';

export const signIn = (email, password) => (dispatch) => {
    return authApi.signIn(email, password)
        .then(data => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token: data, loginError: null },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: LOGIN_FAIL,
                payload: { loginError: error.response.data }
            });
        }
    );
};

export const signUp = (firstName, lastName, email, password, passwordConfirm, phoneNumber) => (dispatch) => {
    return authApi.signUp(firstName, lastName, email, password, passwordConfirm, phoneNumber)
        .then(data => {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: { token: data, registerError: null },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: SIGNUP_FAIL,
                payload: { registerError: error.response.data }
            });
        }
    );
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');

    dispatch({
        type: LOGOUT,
    });

    return Promise.resolve();
};
