import {
    ASSIGN_QUIZ,
} from '../actions/types';

const initialState = {
    classroomStudents: null,
};

const quizInstanceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // case GET_CLASSROOM_STUDENTS:
        //     return {
        //         ...state,
        //         classroomStudents: payload.classroomStudents
        //     };
        default:
            return state;
    }
}
 
export default quizInstanceReducer;
