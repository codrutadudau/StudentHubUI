import {
    GET_COURSES,
    GET_COURSES_WITH_TEACHER_NAME,
    GET_COURSE_BY_ID,
} from '../actions/types';

const initialState = {
    courses: null,
    coursesWithTeacherName: null,
};

const courseReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_COURSES:
            return {
                ...state,
                courses: payload.courses
            };
        case GET_COURSES_WITH_TEACHER_NAME:
            return {
                ...state,
                coursesWithTeacherName: payload.coursesWithTeacherName
            }
        case GET_COURSE_BY_ID:
            return {
                ...state,
                course: payload.course
            }
        default:
            return state;
    }
}
 
export default courseReducer;
