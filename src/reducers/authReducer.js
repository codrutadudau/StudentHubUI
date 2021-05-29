import jwt_decode from "jwt-decode";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const token = sessionStorage.getItem('token');

const initialState = token ?
    { isLoggedIn: true } :
    { isLoggedIn: false };

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
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
 
export default authReducer;
