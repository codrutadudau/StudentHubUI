import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, withRouter } from "react-router";
import isEmpty from 'lodash/isEmpty';
import "react-datetime/css/react-datetime.css";

import { getQuizById, createQuiz } from '../../actions/quiz';

export function Details({location: {state}}) {
    const dispatch = useDispatch();
    const params = useParams();
    const quizReducer = useSelector(state => state.quizReducer);

    const [payload, setPayload] = useState({
        name: "",
        quizIntro: "",
        timeOpen: "",
        timeClose: "",
        password: "",
    });

    useEffect(() => {
        if (!isEmpty(params) && !state) {
            dispatch(getQuizById(params.id));
        }
    }, []);
    
    useEffect(() => {
        if (state) {
            console.log(2)
            setPayloadForm(state);
        }
    }, [state]);

    useEffect(() => {
        if (!state && quizReducer.quiz) {
            console.log(1)
            setPayloadForm(quizReducer.quiz);
        }
    }, [quizReducer.quiz]);

    const setPayloadForm = (state) =>{
        setPayload({
            ...payload,
            name: state.name,
            quizIntro: state.quizIntro,
            timeOpen: new Date(state.timeOpen),
            timeClose: new Date(state.timeClose),
            password: state.password
        });
    }

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleOnChangeTimeOpen = e => {
        setPayload({
            ...payload,
            timeOpen: new Date(e.toString())
        });
    }

    const handleOnChangeTimeClose = e => {
        setPayload({
            ...payload,
            timeClose: new Date(e.toString())
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            createQuiz({
                ...payload,
                timeOpen: (payload.timeOpen).toISOString(),
                timeClose: (payload.timeClose).toISOString()
            })
        );
    }

    return (
        <div className="page-content">
            <Container className="d-flex justify-content-center quiz">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Quiz Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={handleOnChange}
                            value={payload.name}
                        />
                        <Form.Label>Quiz Intro</Form.Label>
                        <Form.Control
                            type="text"
                            name="quizIntro"
                            onChange={handleOnChange}
                            value={payload.quizIntro}
                        />
                        <Form.Label>Time Open</Form.Label>
                        <Datetime
                            value={payload.timeOpen}
                            onChange={handleOnChangeTimeOpen}
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm"
                            utc={true}
                        />
                        <Form.Label>Time Close</Form.Label>
                        <Datetime
                            value={payload.timeClose}
                            onChange={handleOnChangeTimeClose}
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm"
                            utc={true}
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            onChange={handleOnChange}
                            value={payload.password}
                        />
                        <Button type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default withRouter(Details);
