import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deleteQuestion, getAllQuestions } from '../../actions/question';

export default function DeleteQuestion(props) {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(deleteQuestion(props.id)).then(() => {
            dispatch(getAllQuestions());
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="question-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete Question
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete the question <span className="question-modal-name">{props.description}</span>?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
