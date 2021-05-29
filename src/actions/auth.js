import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
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
