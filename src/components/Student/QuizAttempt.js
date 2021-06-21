import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter, useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import Timer from '../Timer';

import { getQuizById } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';
import { getQuizInstance } from '../../actions/quizInstance';

import '../../assets/scss/student.scss';
import '../../assets/scss/quiz.scss';

export function QuizAttempt({ location: { state } }) {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [quizOptions, setQuizOptions] = useState();
    const [time, setTime] = useState();

    const quiz = useSelector(state => state.quizReducer.quiz);
    const questions = useSelector(state => state.questionReducer.quizQuestions);
    const quizInstance = useSelector(state => state.quizInstanceReducer.quizInstance);

    useEffect(() => {
        if (state) {
            dispatch(getQuizById(state.quiz.id))
                .then(() => {
                    dispatch(getQuestionsByQuizId(state.quiz.id));
                })
        }
    }, []);

    useEffect(() => {
        if (!quiz && !state) {
            dispatch(getQuizInstance(params.id));
        }
    }, []);

    useEffect(() => {
        if (!state && quizInstance) {
            dispatch(getQuizById(quizInstance.quiz.id))
                .then(() => {
                    dispatch(getQuestionsByQuizId(quizInstance.quiz.id));
                })
        }
    }, [quizInstance]);

    useEffect(() => {
        if (!quizInstance && state) {
            const startedAt = new Date(state.startedAt);
            startedAt.setSeconds(startedAt.getSeconds() + 60 * state.quiz.duration);
            setTime(startedAt);
        }
    }, []);

    useEffect(() => {
        if (!state && quizInstance) {
            const startedAt = new Date(quizInstance.startedAt);
            startedAt.setSeconds(startedAt.getSeconds() + 60 * quizInstance.quiz.duration);
            setTime(startedAt);
        }
    }, [quizInstance]);

    const handleSliderChange = slide => {
        setCurrentSlide(slide);
    }

    const handleAnswerCheck = (e, question, answer) => {
        console.log("trigger");
        console.log(question);
        console.log(answer);
        console.log(e.target.name);
    }
    console.log(time);
    return (
        quiz && questions &&
        <Container className="d-flex justify-content-center quiz-view">
            <h2 className="quiz-view-title">
                {quiz.name}
            </h2>
            <div className="quiz-view-intro">
                {quiz.quizIntro}
            </div>
            <div className="quiz-view-wrapper" style={{ display: 'grid' }}>
                {
                    time &&
                    <Timer className="quiz-view-wrapper-timer" expiryTimestamp={time} onExpire={() => console.log(123)} />
                }
                <Dots
                    className="quiz-view-question-dots"
                    value={currentSlide}
                    onChange={handleSliderChange}
                    number={questions ? Object.keys(questions).length : 0}
                    thumbnails={
                        map(questions, (question, index) => {
                            return (<div id={`dot${question.question.id}`} className="quiz-view-question-dots-item">{index + 1}</div>)
                        })
                    }
                />
                <Carousel
                    value={currentSlide}
                    onChange={handleSliderChange}
                    slides = {
                        map(questions, (question, index) => {
                            return (
                                <div className="quiz-view-questions-question" key={index}>
                                    <p key={index}>{question.question.description}</p>
                                    <div className="quiz-view-questions-question-answers">
                                        {
                                            map(question.answers, (answer, index) => {
                                                return (
                                                    <div className="quiz-view-questions-question-answers-item" key={index}>
                                                        <span className="quiz-view-questions-question-answers-item-input">
                                                            <input
                                                                onClick={e => handleAnswerCheck(e, question, answer)}
                                                                id={`question-${question.question.id}-${index}`} 
                                                                name={`question-${question.question.id}`} 
                                                                type={question.question.hasMultipleAnswers ? 'checkbox' : 'radio'}
                                                            />
                                                            </span>
                                                        <label
                                                            onClick={e => handleAnswerCheck(e, question, answer)}
                                                            htmlFor={`question-${question.question.id}-${index}`}
                                                        >
                                                            {answer.description}
                                                        </label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                >
                </Carousel>
            </div>
        </Container>
    );
}

export default withRouter(QuizAttempt);