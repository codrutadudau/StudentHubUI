
import {
    GET_COURSES,
    GET_COURSES_WITH_TEACHER_NAME,
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
