import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function DeleteQuiz(props) {
    const history = useHistory();

    useEffect(() => {
        if (props.show) {
            setTimeout(() => {
            props.onHide();
                history.push('/quizzes');
            }, 3000);
        }
    });

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
                Quiz Submitted
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Thank you for your submission. You're being redirected to the quizzes dashboard...
            </p>
        </Modal.Body>
        </Modal>
    );
}
