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
