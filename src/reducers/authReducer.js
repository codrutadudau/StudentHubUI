import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from '../actions/types';

const initialState = { isLoggedIn: false };

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: payload.token,
                loginError: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                loginError: payload.loginError,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                registerError: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                registerError: payload.registerError,
            };
        default:
            return state;
    }
}
 
export default authReducer;
