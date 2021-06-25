import {
    GET_TEACHERS,
    GET_TEACHER_COURSES,
    GET_TEACHERS_WITH_NAME,
} from '../actions/types';

const initialState = {
    teachers: null,
    teacherCourses: null,
    teachersWithName: null,
};

const teacherReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_TEACHERS:
            return {
                ...state,
                teachers: payload.teachers
            };
        case GET_TEACHER_COURSES:
            return {
                ...state,
                teacherCourses: payload.teacherCourses
            };
        case GET_TEACHERS_WITH_NAME:
            return {
                ...state,
                teachersWithName: payload.teachersWithName
            };
        default:
            return state;
    }
}
 
export default teacherReducer;
