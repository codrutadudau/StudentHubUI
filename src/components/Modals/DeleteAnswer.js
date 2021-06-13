import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deleteAnswer } from '../../actions/answer';
import { getAnswersByQuestionId } from '../../actions/question';

export default function DeleteAnswer(props) {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(deleteAnswer(props.data.id)).then(() => {
            dispatch(getAnswersByQuestionId(props.data.questionId));
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="answer-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete Answer
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete the answer <span className="answer-modal-name">{props.data.description}</span>?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
