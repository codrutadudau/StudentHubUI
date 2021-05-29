import {
  LOGIN_SUCCESS
} from "./types";

import { authApi } from '../api';

export const signIn = (username, password) => async dispatch => {
  const data = await authApi.signIn(username, password);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
    });
};
