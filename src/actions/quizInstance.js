
import {
    ASSIGN_QUIZ_SUCCESS,
    ASSIGN_QUIZ_FAIL,
} from "./types";

import { quizInstanceApi } from '../api';

export const assignQuiz = (payload) => (dispatch) => {
    return quizInstanceApi.assignQuiz(payload)
        .then((response) => {
            dispatch({
                type: ASSIGN_QUIZ_SUCCESS,
            });
        })
        .catch(error => {
            const message = error.response.data.message;
            dispatch({
                type: ASSIGN_QUIZ_FAIL,
            });
        }
    );
};

// export const editAnswer = (id, payload) => (dispatch) => {
//     return answerApi.editAnswer(id, payload)
//         .then(() => {
//             dispatch({
//                 type: EDIT_ANSWER_SUCCESS,
//             });
//         })
//         .catch(error => {
//             const message = error.response.data.message;
//             dispatch({
//                 type: EDIT_ANSWER_FAIL,
//             });
//         }
//     );
// };

// export const deleteAnswer = (id) => (dispatch) => {
//     return answerApi.deleteAnswer(id)
//         .then(() => {
//             dispatch({
//                 type: DELETE_ANSWER,
//             });
//         })
//         .catch(error => {
//             const message = error.response.data.message;
//         }
//     );
// };
