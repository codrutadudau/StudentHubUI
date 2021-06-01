import {
    GET_USERS
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
