import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllTeachers = (id = null) => {
    if (id) {
        return axios.get(API_URL + "/user_teachers?user=" + id);
    }

    return axios.get(API_URL + "/user_teachers");
};

export const getAllTeachersWithName = () => {
    return axios.get(API_URL + "/user_teachers/name");
};

export const getTeacherCourses = (id) => {
    return axios.get(API_URL + "/user_teachers/" + id + "/courses");
};

export const deleteTeacherById = (id) => {
    return axios.delete(API_URL + "/user_teachers/" + id);
};

export const createTeacher = (payload) => {
    return axios.post(API_URL + "/user_teachers", { ...payload });
};

export const deleteTeacher = (id) => {
    return axios.delete(API_URL + "/user_teachers/" + id);
};
