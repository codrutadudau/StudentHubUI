import {
    GET_COURSES,
} from '../actions/types';

const initialState = {
    courses: null,
};

const courseReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_COURSES:
            return {
                ...state,
                courses: payload.courses
            };
        default:
            return state;
    }
}
 
export default courseReducer;
