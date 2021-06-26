import {
    GET_STUDENTS_WITH_NAME,
    GET_STUDENT_BY_ID,
} from '../actions/types';

const initialState = {
    studentsWithName: null,
    student: null,
};

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_STUDENTS_WITH_NAME:
            return {
                ...state,
                studentsWithName: payload.studentsWithName
            };
        case GET_STUDENT_BY_ID:
            return {
                ...state,
                student: payload.student,
            };
        default:
            return state;
    }
}
 
export default studentReducer;
