// import actions + types
import jwt_decode from "jwt-decode";

const token = sessionStorage.getItem('token') ? '' : '';
const email = token ? jwt_decode(token).sub : '';

const initialState = email ? 
    { isLoggedIn: true, email } : 
    { isLoggedIn: false, email: null };

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                email: payload.email
            };
        default:
            return state;
    }
}
 
export default authReducer;
