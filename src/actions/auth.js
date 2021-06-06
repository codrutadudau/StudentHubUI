import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    CLEAR_ERROR
} from "./types";

import { authApi } from '../api';

export const signIn = (email, password) => (dispatch) => {
    return authApi.signIn(email, password)
        .then(data => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token: data },
            });
        })
        .catch(error => {
            const message = error.response.data.message; // TODO: dispatch and display on login form
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    );
};

export const signUp = (firstName, lastName, email, password, passwordConfirm, phoneNumber) => (dispatch) => {
    return authApi.signUp(firstName, lastName, email, password, passwordConfirm, phoneNumber)
        .then(data => {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: { token: data },
            });
        })
        .catch(error => {
            const errorString = error.response.data.message;
            dispatch({
                type: SIGNUP_FAIL,
                payload: { errorString },
            });
        }
    );
};

export const signOut = () => (dispatch) => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('persist:root');

    dispatch({
        type: LOGOUT,
    });
};

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
