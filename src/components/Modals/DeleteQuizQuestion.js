import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deleteQuizQuestion } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';

export default function DeleteQuizQuestion(props) {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(deleteQuizQuestion(props.data.quizId, props.data.id)).then(() => {
            dispatch(getQuestionsByQuizId(props.data.quizId));
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="quiz-delete-question-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete Question
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete the question <span className="quiz-delete-question-modal-description">{props.data.description}</span> from the quiz <span className="quiz-delete-question-modal-quiz-name">{props.data.quizName}</span> ?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
