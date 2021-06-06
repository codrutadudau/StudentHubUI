import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import map from 'lodash/map';

import '../../assets/scss/quiz.scss';

import { getQuizById } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getQuizById(params.id));
        dispatch(getQuestionsByQuizId(params.id));
    }, []);

    const quiz = useSelector(state => state.quizReducer.quiz);
    const questions = useSelector(state => state.questionReducer.questions);

    return (
        quiz &&
        <div className="page-content">
            <Container className="d-flex justify-content-center quiz">
                <h2 className="quiz-title">
                    {quiz.name}
                </h2>
                <div className="quiz-intro">
                    {quiz.quizIntro}
                </div>
                <div className="quiz-questions">
                    {
                        map(questions, (question, index) => {
                            return (
                                <div className="quiz-questions-question" key={index}>
                                    <p key={index}>{question.question.description}</p>
                                    {
                                        map(question.answers, (answer, index) => {
                                            console.log(question.question.hasMultipleAnswers);
                                            return (
                                                <>
                                                    <input name={`question${question.id}`} type={question.question.hasMultipleAnswers ? 'checkbox' : 'radio'} ></input>
                                                    <label htmlFor={`question${question.id}`}>{answer.description}</label><br></br>
                                                </>
                                            );
                                        })
                                    }
                                </div>            
                            );
                        })
                    }
                </div>
            </Container> 
        </div>
    );
}
