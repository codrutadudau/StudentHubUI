import {
    GET_USERS,
    GET_ME_USER
} from "./types";

import { userApi } from '../api';

export const getAllUsers = () => (dispatch) => {
    return userApi.getAllUsers()
        .then(response => {
            dispatch({
                type: GET_USERS,
                payload: { users: response.data },
            });
        })
        .catch(error => {
                const message = error.response.data.message;
            }
        );
};

export const userMe = () => (dispatch) => {
    return userApi.getUserMe()
        .then(response => {
            dispatch({
                type: GET_ME_USER,
                payload: { me: response.data },
            });
        })
        .catch(error => {
                const message = error.response.data.message;
            }
        );
};
