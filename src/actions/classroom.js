
import {
    GET_CLASSROOM_STUDENTS,
} from "./types";

import { classroomApi } from '../api';

export const getClassroomStudents = (id) => (dispatch) => {
    return classroomApi.getClassroomStudents(id)
        .then((response) => {
            dispatch({
                type: GET_CLASSROOM_STUDENTS,
                payload: { classroomStudents: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
