import { GET_USERS } from '../actions/types';

const initialState = {
    users: null
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload.users
            };
        default:
            return state;
    }
}
 
export default userReducer;
