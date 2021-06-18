import {
    GET_TEACHERS,
    GET_TEACHER_COURSES
} from '../actions/types';

const initialState = {
    teachers: null,
    teacherCourses: null
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
        default:
            return state;
    }
}
 
export default teacherReducer;
