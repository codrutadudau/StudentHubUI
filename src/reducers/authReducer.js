// import actions + types
import jwt_decode from "jwt-decode";
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const token = sessionStorage.getItem('token');
const email = token ? jwt_decode(token).sub : '';

const initialState = email ? 
    { isLoggedIn: true, email } : 
    { isLoggedIn: false, email: null };

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                email
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                email: null
            };
        default:
            return state;
    }
}
 
export default authReducer;
