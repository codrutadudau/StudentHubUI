import {
    GET_CLASSROOM_STUDENTS,
    GET_STUDENT_CLASSROOM,
} from '../actions/types';

const initialState = {
    classroom: null,
    classroomStudents: null,
};

const classroomReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CLASSROOM_STUDENTS:
            return {
                ...state,
                classroomStudents: payload.classroomStudents
            };
        case GET_STUDENT_CLASSROOM:
            return {
                ...state,
                classroom: payload.classroom
            };
        default:
            return state;
    }
}
 
export default classroomReducer;
