import { GET_QUESTIONS } from '../actions/types';

const initialState = {
    questions: null
};

const questionReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: payload.questions
            };
        default:
            return state;
    }
}
 
export default questionReducer;
