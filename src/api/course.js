import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllCourses = (id = null) => {
    if (id) {
        return axios.get(API_URL + "/courses?user=" + id);
    }
    
    return axios.get(API_URL + "/courses");
};

export const getAllCoursesWithTeacherName = () => {
    return axios.get(API_URL + "/courses/teacher");
};
