import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { sendEmail } from '../../actions/email';

export default function SendQuizReminder(props) {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(sendEmail({
            from: 'admin@info.uaic.ro',
            to: props.data.email,
            subject: 'Quiz reminder',
            body: `This is a reminder for a quiz associated to the course ${props.data.course.course.name}. Please finish the assignment as soon as possible.`
        }));

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
                Send Reminder
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to send a quiz reminder to the user with the email <span className="quiz-modal-name">{props.data.email}</span>?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleClick}>Yes</Button>
            <Button className="btn btn-danger" onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
