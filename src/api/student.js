import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllStudentsWithName = () => {
    return axios.get(API_URL + "/user_students/name");
};

export const getStudentById = (id) => {
    return axios.get(API_URL + "/user_students/" + id);
};

export const deleteStudent = (id) => {
    return axios.delete(API_URL + "/user_students/" + id);
};

export const editStudent = (id, payload) => {
    return axios.put(API_URL + "/user_students/" + id, { ...payload });
};

export const createStudent = (payload) => {
    return axios.post(API_URL + "/user_students", { ...payload });
};
