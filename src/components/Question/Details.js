import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, withRouter } from "react-router";
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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

    const [answersPayload, setAnswersPayload] = useState({
        nrAnswers: 0,
        answers: "",
        correctAnswers: "",
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

    const handleAddAnswer = () => {
        const currentNrOfAnswers = answersPayload.nrAnswers + 1;
        const lastIndexOfAnswers = Object.keys(answersPayload.answers)[Object.keys(answersPayload.answers).length-1];
        const currentIndex = lastIndexOfAnswers ?
            parseInt(lastIndexOfAnswers.replace(/[^0-9]/g, '')) + 1 :
            currentNrOfAnswers;

        setAnswersPayload({
            ...answersPayload,
            answers: {
                ...answersPayload.answers,
                [`answer-${currentIndex}`]: ""

            },
            nrAnswers: currentNrOfAnswers
        });
    }

    const handleRemoveAnswer = (e, index) => {
        delete answersPayload.answers[index];
        delete answersPayload.correctAnswers[index];

        setAnswersPayload({
            ...answersPayload,
            answers: {
                ...answersPayload.answers,
            },
            correctAnswers: {
                ...answersPayload.correctAnswers,
            },
            nrAnswers: answersPayload.nrAnswers - 1
        });
    }

    const handleOnChange = e => {
        if (e.target.name === 'hasMultipleAnswers') {
            setAnswersPayload({
                ...answersPayload,
                correctAnswers: "",
            });
        }

        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleOnAnswerChange = (e, index) => {
        setAnswersPayload({
            ...answersPayload,
            answers: {
                ...answersPayload.answers,
                [index]: e.target.value
            }
        });
    }

    const handleCheckbox = (e, index) => {
        if (answersPayload.correctAnswers[index]) {
            delete answersPayload.correctAnswers[index];
            setAnswersPayload({
                ...answersPayload,
                correctAnswers: {
                    ...answersPayload.correctAnswers,
                }
            });
        } else {
            setAnswersPayload({
                ...answersPayload,
                correctAnswers: {
                    ...answersPayload.correctAnswers,
                    [index]: index
                }
            });
        }
    }

    const handleRadio = (e, index) => {
        setAnswersPayload({
            ...answersPayload,
            correctAnswers: {
                [index]: index
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (location.pathname.includes('/create')) {
            dispatch(createQuestion(payload, answersPayload))
                .then((response) => {
                    // history.push('/questions');
                });

            return;
        }

        dispatch(editQuestion(params.id, payload))
            .then(() => {
                history.push('/questions');
            });

    }

    return (
        <Container className="d-flex justify-content-center question">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Question Description</Form.Label>
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
                    <div onClick={handleAddAnswer} className="btn btn-success question-add-answers">
                        <AddCircleOutlineIcon />
                        <span>Add answer</span>
                    </div>
                    {
                        answersPayload.nrAnswers > 0 &&
                        <div className="question-answers">
                            {
                                map(answersPayload.answers, (answer, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="text" name={index} onChange={e => handleOnAnswerChange(e, index)} required />
                                            {
                                                'true' === payload.hasMultipleAnswers ?
                                                    <input type="checkbox" name={index} onChange={e => handleCheckbox(e, index)} checked={answersPayload.correctAnswers[index]} /> :
                                                    <input type="radio" name={`answer`} onChange={e => handleRadio(e, index)} checked={answersPayload.correctAnswers[index]} />
                                            }
                                            <RemoveCircleOutlineIcon onClick={e => handleRemoveAnswer(e, index)} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default withRouter(Details);
