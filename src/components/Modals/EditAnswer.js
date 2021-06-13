import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import { editAnswer } from '../../actions/answer';
import { getAnswersByQuestionId } from '../../actions/question';

export default function EditAnswer(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [payload, setPayload] = useState({
        description: "",
        correct: false,
    });

    useEffect(() => {
        setPayload(props.data);
    }, [props.data]);

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(editAnswer(props.data.id, {
            ...payload,
            correct: !!JSON.parse(String(payload.correct).toLowerCase()) // convert "true", "false" to boolean
        }))
        .then(() => {
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
                Edit answer
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Answer Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            onChange={handleOnChange}
                            value={payload.description}
                        />
                        <Form.Label>Correct</Form.Label>
                        <Form.Check
                            type="radio"
                            label="No"
                            name="correct"
                            onChange={handleOnChange}
                            checked={payload.correct === "" || payload.correct === "false" || payload.correct === false}
                            value={false}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="correct"
                            onChange={handleOnChange}
                            checked={payload.correct === "true" || payload.correct === true}
                            value={true}
                        />
                    </Form.Group>
                </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
        </Modal>
    );
}
