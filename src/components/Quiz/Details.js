import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import isEmpty from 'lodash/isEmpty';

import { getQuizById } from '../../actions/quiz';

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    const quizReducer = useSelector(state => state.quizReducer);

    const [payload, setPayload] = useState({
        quizName: "",
        quizIntro: "",
        timeOpen: "",
        timeClose: "",
        password: "",
    });

    useEffect(() => {
        if (!isEmpty(params)) {
            dispatch(getQuizById(params.id));
            setPayload({
                ...payload,
                quizName: quizReducer.quiz.name,
                quizIntro: quizReducer.quiz.quizIntro,
                timeOpen: quizReducer.quiz.timeOpen,
                timeClose: quizReducer.quiz.timeClose,
                password: quizReducer.quiz.password
            });
        }
    }, []);

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="page-content">
            <Container className="d-flex justify-content-center quiz">
                <Form>
                    <Form.Group>
                        <Form.Label>Quiz Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="quizName"
                            onChange={handleOnChange}
                            value={payload.quizName}
                        />
                        <Form.Label>Quiz Intro</Form.Label>
                        <Form.Control
                            type="text"
                            name="quizIntro"
                            onChange={handleOnChange}
                            value={payload.quizIntro}
                        />
                        <Form.Label>Time Open</Form.Label>
                        <Form.Control
                            type="text"
                            name="timeOpen"
                            onChange={handleOnChange}
                            value={payload.timeOpen}
                            disabled
                        />
                        <Form.Label>Time Close</Form.Label>
                        <Form.Control
                            type="text"
                            name="timeClose"
                            onChange={handleOnChange}
                            value={payload.timeClose}
                            disabled
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            onChange={handleOnChange}
                            value={payload.password}
                        />
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}
