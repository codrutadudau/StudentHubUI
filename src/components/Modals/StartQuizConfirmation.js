import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import { startQuiz } from '../../actions/quizInstance';

export default function StartQuizConfirmation(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = e => {
        dispatch(
                startQuiz(props.data.id)
            ).then(() => {
                history.push(`/quizzes/${props.data.id}/take`, props.data);
            });
        props.onHide();
    }

    return (
        props && props.data ?
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="quiz-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Start Quiz
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to start the quiz <span>{props.data.quiz.name}</span>?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleClick}>Yes</Button>
            <Button className="btn btn-danger" onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal> :
        null
    );
}
