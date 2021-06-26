
import {
    GET_COURSES,
    GET_COURSES_WITH_TEACHER_NAME,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAIL,
    GET_COURSE_BY_ID,
    DELETE_COURSE,
    EDIT_COURSE_SUCCESS,
    EDIT_COURSE_FAIL,
} from "./types";

import { courseApi } from '../api';

export const getAllCourses = (id = null) => (dispatch) => {
    return courseApi.getAllCourses(id)
        .then((response) => {
            dispatch({
                type: GET_COURSES,
                payload: { courses: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getAllCoursesWithTeacherName = () => (dispatch) => {
    return courseApi.getAllCoursesWithTeacherName()
        .then((response) => {
            dispatch({
                type: GET_COURSES_WITH_TEACHER_NAME,
                payload: { coursesWithTeacherName: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const createCourse = (payload) => (dispatch) => {
    return courseApi.createCourse(payload)
        .then(() => {
            dispatch({
                type: CREATE_COURSE_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: CREATE_COURSE_FAIL,
            });
        }
    );
};

export const editCourse = (id, payload) => (dispatch) => {
    return courseApi.editCourse(id, payload)
        .then(() => {
            dispatch({
                type: EDIT_COURSE_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: EDIT_COURSE_FAIL,
            });
        }
    );
};

export const getCourseById = (id) => (dispatch) => {
    return courseApi.getCourseById(id)
        .then(response => {
            dispatch({
                type: GET_COURSE_BY_ID,
                payload: { course: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const deleteCourse = (id) => (dispatch) => {
    return courseApi.deleteCourse(id)
        .then(() => {
            dispatch({
                type: DELETE_COURSE,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};