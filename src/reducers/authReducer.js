import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const token = sessionStorage.getItem('token');

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
        default:
            return state;
    }
}
 
export default authReducer;
