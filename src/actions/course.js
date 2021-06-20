
import {
    GET_COURSES,
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
