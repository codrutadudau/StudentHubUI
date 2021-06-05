import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";

import { getQuizById } from '../../actions/quiz';

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();

    const [payload, setPayload] = useState({
        quizName: "",
        quizIntro: ""
    });

    useEffect(() => {
        dispatch(getQuizById(params.id));
    }, []);

    const quiz = useSelector(state => state.quizReducer.quiz);

    return (
        quiz &&
        <>
            <div className="page-content">
                Edit {quiz.name}
                <Form>
                    <Form.Group>
                        <Form.Label>Quiz Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="quizName"
                            onChange={ e => setPayload({
                                ...payload,
                                quizName: e.target.value})
                            }
                            value={quiz.name}
                            required
                        />
                        <Form.Label>Quiz Intro</Form.Label>
                        <Form.Control
                            type="text"
                            id="quizIntro"
                            onChange={ e => setPayload({
                                ...payload,
                                quizIntro: e.target.value})
                            }
                            value={quiz.quizIntro}
                            required
                        />
                        <Form.Label>Time Open</Form.Label>
                        <Form.Control
                            type="text"
                            id="timeOpen"
                            onChange={ e => setPayload({
                                ...payload,
                                timeOpen: e.target.value})
                            }
                            value={quiz.timeOpen}
                            required
                            disabled
                        />
                        <Form.Label>Time Close</Form.Label>
                        <Form.Control
                            type="text"
                            id="timeClose"
                            onChange={ e => setPayload({
                                ...payload,
                                timeClose: e.target.value})
                            }
                            value={quiz.timeClose}
                            required
                            disabled
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            onChange={ e => setPayload({
                                ...payload,
                                password: e.target.value})
                            }
                            value={quiz.password}
                            required
                        />
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}
