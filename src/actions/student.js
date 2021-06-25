
import {
    GET_STUDENTS_WITH_NAME,
} from "./types";

import { studentApi } from '../api';

export const getAllStudentsWithName = () => (dispatch) => {
    return studentApi.getAllStudentsWithName()
        .then((response) => {
            dispatch({
                type: GET_STUDENTS_WITH_NAME,
                payload: { studentsWithName: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
