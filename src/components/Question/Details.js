import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, withRouter } from "react-router";
import isEmpty from 'lodash/isEmpty';
import { getQuestionById, createQuestion, editQuestion } from '../../actions/question';

export function Details({ location: { state } }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const question = useSelector(state => state.questionReducer.question);

    const [payload, setPayload] = useState({
        description: "",
        defaultGrade: "",
        hasMultipleAnswers: ""
    });

    useEffect(() => {
        if (!isEmpty(params) && !state) {
            dispatch(getQuestionById(params.id));
        }
    }, []);

    useEffect(() => {
        if (state) {
            setPayloadForm(state);
        }
    }, [state]);

    useEffect(() => {
        if (!state && question && location.pathname.includes('/edit')) {
            setPayloadForm(question);
        }
    }, [question]);

    const setPayloadForm = (state) =>{
        setPayload({
            ...payload,
            description: state.description,
            defaultGrade: state.defaultGrade,
            hasMultipleAnswers: state.hasMultipleAnswers
        });
    }

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (location.pathname.includes('/create')) {
            dispatch(createQuestion(payload))
                .then(() => {
                    history.push('/questions');
                });

            return;
        }

        dispatch(editQuestion(params.id, payload))
            .then(() => {
                history.push('/questions');
            });
    }

    return (
        <div className="page-content">
            <Container className="d-flex justify-content-center question">
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
                            value={true}
                        />
                        <Form.Check
                            type="radio"
                            label="false"
                            name="hasMultipleAnswers"
                            onChange={handleOnChange}
                            value={false}
                        />
                        <Button type="submit">Submit</Button>
                    </Form.Group>
                </Form>
             </Container>
        </div>
    );
}

export default withRouter(Details);
