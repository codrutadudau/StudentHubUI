import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import map from 'lodash/map';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import '../../assets/scss/quiz.scss';

import { getQuizById } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);

    const quiz = useSelector(state => state.quizReducer.quiz);
    const questions = useSelector(state => state.questionReducer.quizQuestions);

    useEffect(() => {
        dispatch(getQuizById(params.id));
    }, []);

    useEffect(() => {
        if (quiz) {
            dispatch(getQuestionsByQuizId(params.id));
        }
    }, [quiz]);

    const handleSliderChange = slide => {
        setCurrentSlide(slide);
    }

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
                <Dots
                    className="quiz-view-question-dots"
                    value={currentSlide}
                    onChange={handleSliderChange}
                    number={questions ? Object.keys(questions).length : 0}
                    thumbnails={
                        map(questions, (question, index) => {
                            return (<div className="quiz-view-question-dots-item">{index + 1}</div>)
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
                                    <p key={index}>{question.question.description} ({question.question.defaultGrade}p)</p>
                                    <div className="quiz-view-questions-question-answers">
                                        {
                                            map(question.answers, (answer, index) => {
                                                return (
                                                    <div className="quiz-view-questions-question-answers-item" key={index}>
                                                        <span className="quiz-view-questions-question-answers-item-input">
                                                            <input
                                                                name={`question${question.question.id}`} type={question.question.hasMultipleAnswers ? 'checkbox' : 'radio'}
                                                            />
                                                            </span>
                                                        <label htmlFor={`question${question.question.id}`}>{answer.description}</label><br></br>
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
