import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deleteQuiz, getAllQuizzes } from '../../actions/quiz';

export default function DeleteQuiz(props) {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(deleteQuiz(props.id)).then(() => {
            dispatch(getAllQuizzes());
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="quiz-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete Quiz
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete the quiz <span className="quiz-modal-name">{props.name}</span>?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
