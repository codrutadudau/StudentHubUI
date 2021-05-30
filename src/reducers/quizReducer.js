import { GET_QUIZZES } from '../actions/types';

const initialState = {
    quizzes: null
};

const quizReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_QUIZZES:
            return {
                ...state,
                quizzes: payload.quizzes
            };
        default:
            return state;
    }
}
 
export default quizReducer;
