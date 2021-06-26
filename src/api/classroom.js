import axios from 'axios';

const API_URL = process.env.API_URL;

export const getClassroomStudents = (id) => {
    return axios.get(API_URL + "/classrooms/" + id + "/students");
};

export const getStudentClassroomByUserId = (id) => {
    return axios.get(API_URL + "/classrooms?user=" + id);
};

export const getClassrooms = () => {
    return axios.get(API_URL + "/classrooms");
};

export const getClassroomById = (id) => {
    return axios.get(API_URL + "/classrooms/" + id);
};

export const getClassroomCourses = (id) => {
    return axios.get(API_URL + "/classrooms/" + id + "/courses");
};

export const createClassroom = (payload) => {
    return axios.post(API_URL + "/classrooms", { ...payload });
};

export const editClassroom = (id, payload) => {
    return axios.put(API_URL + "/classrooms/" + id, { ...payload });
};

export const deleteClassroom = (id) => {
    return axios.delete(API_URL + "/classrooms/" + id);
};

export const deleteClassroomCourse = (id, courseId) => {
    return axios.delete(API_URL + "/classrooms/" + id + "/course/" + courseId);
};

export const addClassroomCourse = (id, courseId) => {
    return axios.post(API_URL + "/classrooms/" + id + "/course/" + courseId);
};
