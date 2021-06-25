
import {
    GET_CLASSROOM_STUDENTS,
    GET_STUDENT_CLASSROOM,
    GET_CLASSROOMS,
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

export const getStudentClassroom = (id) => (dispatch) => {
    return classroomApi.getStudentClassroomByUserId(id)
        .then((response) => {
            dispatch({
                type: GET_STUDENT_CLASSROOM,
                payload: { classroom: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getClassrooms = () => (dispatch) => {
    return classroomApi.getClassrooms()
        .then((response) => {
            dispatch({
                type: GET_CLASSROOMS,
                payload: { classrooms: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
