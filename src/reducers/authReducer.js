import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_FAIL,
    CLEAR_ERROR
} from '../actions/types';

const initialState = { isLoggedIn: false };

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                errorString: payload.errorString
            };
        case CLEAR_ERROR:
            return {
                ...state,
                errorString: null
            };
        default:
            return state;
    }
}
 
export default authReducer;
