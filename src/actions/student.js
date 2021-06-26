
import {
    GET_STUDENTS_WITH_NAME,
    GET_STUDENT_BY_ID,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAIL,
    EDIT_STUDENT_SUCCESS,
    EDIT_STUDENT_FAIL,
    DELETE_STUDENT,
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

export const getStudentById = (id) => (dispatch) => {
    return studentApi.getStudentById(id)
        .then((response) => {
            dispatch({
                type: GET_STUDENT_BY_ID,
                payload: { student: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const createStudent = (payload) => (dispatch) => {
    return studentApi.createStudent(payload)
        .then(() => {
            dispatch({
                type: CREATE_STUDENT_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: CREATE_STUDENT_FAIL,
            });
        }
    );
};

export const editStudent = (id, payload) => (dispatch) => {
    return studentApi.editStudent(id, payload)
        .then(() => {
            dispatch({
                type: EDIT_STUDENT_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: EDIT_STUDENT_FAIL,
            });
        }
    );
};

export const deleteStudent = (id) => (dispatch) => {
    return studentApi.deleteStudent(id)
        .then(() => {
            dispatch({
                type: DELETE_STUDENT,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
