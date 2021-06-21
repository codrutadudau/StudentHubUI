import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter, useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { getQuizInstance, getFinishedQuizInstance } from '../../actions/quizInstance';

import '../../assets/scss/student.scss';
import '../../assets/scss/quiz.scss';

export function QuizReview({ location: { state } }) {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);

    const quizInstance = useSelector(state => state.quizInstanceReducer.quizInstance);
    const finishedQuizInstance = useSelector(state => state.quizInstanceReducer.finishedQuizInstance);

    useEffect(() => {
        if (!quizInstance) {
            dispatch(getQuizInstance(params.id));
        }
    }, [quizInstance]);

    useEffect(() => {
        if (!finishedQuizInstance) {
            dispatch(getFinishedQuizInstance(params.id));
        }
    }, [finishedQuizInstance]);

    const handleSliderChange = slide => {
        setCurrentSlide(slide);
    }

    return (
        quizInstance && finishedQuizInstance &&
        <Container className="d-flex justify-content-center quiz-view">
            {
                <>
                    <h2 className="quiz-view-title">
                        {quizInstance.quiz.name}
                    </h2>
                    <div className="quiz-view-intro">
                        {quizInstance.quiz.quizIntro}
                    </div>
                    <div className="quiz-view-wrapper">
                        <div className="quiz-view-wrapper-grade">Grade: {quizInstance.grade}/10</div>
                        <Dots
                            className="quiz-view-question-dots"
                            value={currentSlide}
                            onChange={handleSliderChange}
                            number={Object.keys(finishedQuizInstance).length}
                            thumbnails={
                                map(finishedQuizInstance, (question, index) => {
                                    return (<div id={`dot${question.question.id}`} className="quiz-view-question-dots-item">{index + 1}</div>)
                                })
                            }
                        />
                        <Carousel
                            value={currentSlide}
                            onChange={handleSliderChange}
                            slides = {
                                map(finishedQuizInstance, (question, index) => {
                                    return (
                                        <div className="quiz-view-questions-question" key={index}>
                                            <p key={index}>{question.question.description} ({question.question.defaultGrade}p)</p>
                                            <div className="quiz-view-questions-question-answers">
                                                {
                                                    map(question.answers, (answer, index) => {
                                                        return (
                                                            <div className={`quiz-view-questions-question-answers-item quiz-view-questions-question-answers-item--${answer.correct === "true" ? 'correct' : answer.correct === "false" && answer.checkedByUser === "true" ? 'incorrect' : ''}`} key={index}>
                                                                <span className="quiz-view-questions-question-answers-item-input">
                                                                    <input
                                                                        id={`question-${question.question.id}-${index}`} 
                                                                        name={`question-${question.question.id}`} 
                                                                        type={question.question.hasMultipleAnswers ? 'checkbox' : 'radio'}
                                                                        checked={answer.checkedByUser === "true"}
                                                                        disabled
                                                                    />
                                                                    </span>
                                                                <label
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
                </>
            }
        </Container>
    );
}

export default withRouter(QuizReview);