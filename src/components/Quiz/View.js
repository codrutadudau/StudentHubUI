import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import map from 'lodash/map';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import '../../assets/scss/quiz.scss';

import { getQuizById } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        dispatch(getQuizById(params.id))
            .then(() => {
                dispatch(getQuestionsByQuizId(params.id));
            })
    }, []);

    const quiz = useSelector(state => state.quizReducer.quiz);
    const questions = useSelector(state => state.questionReducer.quizQuestions);

    const handleSliderChange = slide => {
        setCurrentSlide(slide);
        console.log(slide);
    }

    return (
        quiz &&
        <Container className="d-flex justify-content-center quiz-view">
            <h2 className="quiz-view-title">
                {quiz.name}
            </h2>
            <div className="quiz-view-intro">
                {quiz.quizIntro}
            </div>
            <div style={{ display: 'grid' }}>
                <Dots
                    value={currentSlide}
                    onChange={handleSliderChange}
                    number={3}
                    thumbnails={[
                        (<div>1</div>),
                        (<div>2</div>),
                        (<div>3</div>),
                    ]}
                />
                <Carousel
                    value={currentSlide}
                    onChange={handleSliderChange}
                    slides = {
                        map(questions, (question, index) => {
                            return (
                                <div className="quiz-view-questions-question" key={index}>
                                    <p key={index}>{question.question.description}</p>
                                    {
                                        map(question.answers, (answer, index) => {
                                            return (
                                                <div key={index}>
                                                    <input name={`question${question.id}`} type={question.question.hasMultipleAnswers ? 'checkbox' : 'radio'} ></input>
                                                    <label htmlFor={`question${question.id}`}>{answer.description}</label><br></br>
                                                </div>
                                            );
                                        })
                                    }
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
