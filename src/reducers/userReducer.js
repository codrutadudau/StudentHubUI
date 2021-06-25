import {
    GET_USERS,
    GET_USER,
    GET_ME_USER,
    GET_TEACHER_USERS,
} from '../actions/types';

const initialState = {
    users: null,
    user: null,
    me : null
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload.users
            };
        case GET_USER:
            return {
                ...state,
                user: payload.user
            };
        case GET_ME_USER:
            return {
                ...state,
                me: payload.me
            };
        case GET_TEACHER_USERS:
            return {
                ...state,
                teacherUsers: payload.teacherUsers
            };
        default:
            return state;
    }
}
 
export default userReducer;
