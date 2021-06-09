import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import { editQuestion, getQuestionsByQuizId } from '../../actions/question';
import { addQuizQuestion } from '../../actions/quiz';

export default function AddQuizQuestion(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [payload, setPayload] = useState({
        description: "",
        defaultGrade: "",
        hasMultipleAnswers: ""
    });
    const id = props.data.id;

    useEffect(() => {
        if (id) {
            setPayload(props.data);
        } else {
            setPayload({
                ...payload,
                description: "",
                defaultGrade: "",
                hasMultipleAnswers: ""
            });
        }
    }, [id]);

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const quizId = props.data.quizId;

        if (!id) {
            dispatch(addQuizQuestion(quizId, payload))
                .then(() => {
                    dispatch(getQuestionsByQuizId(quizId));
                });
        } else {
            dispatch(editQuestion(id, payload))
                .then(() => {
                    dispatch(getQuestionsByQuizId(quizId));
                });
        }

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
                {props.data.id ? 'Edit quiz question' : 'Add quiz question'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Question Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            onChange={handleOnChange}
                            value={payload.description}
                        />
                        <Form.Label>Default Grade</Form.Label>
                        <Form.Control
                            type="number"
                            name="defaultGrade"
                            onChange={handleOnChange}
                            value={payload.defaultGrade}
                        />
                        <Form.Label>Multiple Answers</Form.Label>
                        <Form.Check
                            type="radio"
                            label="true"
                            name="hasMultipleAnswers"
                            onChange={handleOnChange}
                            checked={payload.hasMultipleAnswers === 'true'}
                            value={true}
                        />
                        <Form.Check
                            type="radio"
                            label="false"
                            name="hasMultipleAnswers"
                            onChange={handleOnChange}
                            checked={payload.hasMultipleAnswers === 'false'}
                            value={false}
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
