
import {
    GET_TEACHERS,
    GET_TEACHER_COURSES,
    GET_TEACHERS_WITH_NAME,
} from "./types";

import { teacherApi } from '../api';

export const getAllTeachers = (id) => (dispatch) => {
    return teacherApi.getAllTeachers(id)
        .then((response) => {
            dispatch({
                type: GET_TEACHERS,
                payload: { teachers: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getAllTeachersWithName = () => (dispatch) => {
    return teacherApi.getAllTeachersWithName()
        .then((response) => {
            dispatch({
                type: GET_TEACHERS_WITH_NAME,
                payload: { teachersWithName: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getTeacherCourses = (id) => (dispatch) => {
    return teacherApi.getTeacherCourses(id)
        .then((response) => {
            dispatch({
                type: GET_TEACHER_COURSES,
                payload: { teacherCourses: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
