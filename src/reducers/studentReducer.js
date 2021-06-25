import {
    GET_STUDENTS_WITH_NAME,
} from '../actions/types';

const initialState = {
    studentsWithName: null,
};

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_STUDENTS_WITH_NAME:
            return {
                ...state,
                studentsWithName: payload.studentsWithName
            };
        default:
            return state;
    }
}
 
export default studentReducer;
