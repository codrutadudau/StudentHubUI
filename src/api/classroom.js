import axios from 'axios';

const API_URL = process.env.API_URL;

export const getClassroomStudents = (id) => {
    return axios.get(API_URL + "/classrooms/" + id + "/students");
};
