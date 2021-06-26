
import {
    GET_CLASSROOM_STUDENTS,
    GET_STUDENT_CLASSROOM,
    GET_CLASSROOMS,
    GET_CLASSROOM_BY_ID,
    DELETE_CLASSROOM,
    CREATE_CLASSROOM_SUCCESS,
    CREATE_CLASSROOM_FAIL,
    EDIT_CLASSROOM_SUCCESS,
    EDIT_CLASSROOM_FAIL,
    GET_CLASSROOM_COURSES,
    DELETE_CLASSROOM_COURSE,
    ADD_CLASSROOM_COURSE,
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

export const getClassroomById = (id) => (dispatch) => {
    return classroomApi.getClassroomById(id)
        .then((response) => {
            dispatch({
                type: GET_CLASSROOM_BY_ID,
                payload: { classroom: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const getClassroomCourses = (id) => (dispatch) => {
    return classroomApi.getClassroomCourses(id)
        .then((response) => {
            dispatch({
                type: GET_CLASSROOM_COURSES,
                payload: { classroomCourses: response.data },
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const createClassroom = (payload) => (dispatch) => {
    return classroomApi.createClassroom(payload)
        .then(() => {
            dispatch({
                type: CREATE_CLASSROOM_SUCCESS,
            });
        })
        .catch(error => {
            console.log(error);
            const message = error.response.data.message;
            dispatch({
                type: CREATE_CLASSROOM_FAIL,
            });
        }
    );
};

export const editClassroom = (id, payload) => (dispatch) => {
    return classroomApi.editClassroom(id, payload)
        .then(() => {
            dispatch({
                type: EDIT_CLASSROOM_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: EDIT_CLASSROOM_FAIL,
            });
        }
    );
};

export const deleteClassroom = (id) => (dispatch) => {
    return classroomApi.deleteClassroom(id)
        .then(() => {
            dispatch({
                type: DELETE_CLASSROOM,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const deleteClassroomCourse = (id, courseId) => (dispatch) => {
    return classroomApi.deleteClassroomCourse(id, courseId)
        .then(() => {
            dispatch({
                type: DELETE_CLASSROOM_COURSE,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};

export const addClassroomCourse = (id, courseId) => (dispatch) => {
    return classroomApi.addClassroomCourse(id, courseId)
        .then(() => {
            dispatch({
                type: ADD_CLASSROOM_COURSE,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
        }
    );
};
