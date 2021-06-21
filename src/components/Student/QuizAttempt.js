import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { withRouter, useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ThankYou from '../Modals/ThankYou';

import Timer from '../Timer';

import { getQuizById } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';
import { getQuizInstance, finishQuiz } from '../../actions/quizInstance';
import { saveAnswerOption } from '../../actions/answerOption';

import '../../assets/scss/student.scss';
import '../../assets/scss/quiz.scss';

export function QuizAttempt({ location: { state } }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [singleAnswers, setSingleAnswers] = useState();
    const [multipleAnswers, setMultipleAnswers] = useState();
    const [time, setTime] = useState();
    const [grade, setGrade] = useState(0);
    const [singleAnswersGrades, setSingleAnswersGrades] = useState();
    const [multipleAnswersGrades, setMultipleAnswersGrades] = useState();

    const quiz = useSelector(state => state.quizReducer.quiz);
    const questions = useSelector(state => state.questionReducer.quizQuestions);
    const quizInstance = useSelector(state => state.quizInstanceReducer.quizInstance);
    const me = useSelector(state => state.userReducer.me);

    useEffect(() => {
        if (!quizInstance) {
            dispatch(getQuizInstance(params.id));
        }
    }, []);

    useEffect(() => {
        if (state) {
            dispatch(getQuizById(state.quiz.id))
                .then(() => {
                    dispatch(getQuestionsByQuizId(state.quiz.id));
                })
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
        if (quizInstance && quizInstance.startedAt) {
            const startedAt = new Date(quizInstance.startedAt);
            startedAt.setSeconds(startedAt.getSeconds() + 60 * quizInstance.quiz.duration);
            setTime(startedAt);
        }
    }, [quizInstance]);

    const handleSliderChange = slide => {
        setCurrentSlide(slide);
    }

    const handleAnswerCheck = (e, question, answer) => {
        if (e.target.name === undefined) {
            return;
        }

        if (question.question.hasMultipleAnswers) {

        } else {
            setSingleAnswers({
                ...singleAnswers,
                [`question-${question.question.id}`]: answer.id,
            });
            setSingleAnswersGrades({
                ...singleAnswersGrades,
                [`question-${question.question.id}`]: answer.correct ? question.question.defaultGrade : 0,
            });
        }
    }

    const handleSubmit = e => {
        let tempGrade = 0;
        map(singleAnswers, answer => {
            dispatch(saveAnswerOption({
                answer,
                userStudent: me.id
            }));
        });
        map(singleAnswersGrades, answerGrade => {
            tempGrade += answerGrade;
        });
        dispatch(finishQuiz(quizInstance.id, {
            grade: tempGrade,
        })).then(() => {
            setModalShow(true);
        });
    }

    return (
        quiz && questions &&
        <Container className="d-flex justify-content-center quiz-view">
            {
                quizInstance.finishedAt == null ?
                <>
                    <ThankYou
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <h2 className="quiz-view-title">
                        {quiz.name}
                    </h2>
                    <div className="quiz-view-intro">
                        {quiz.quizIntro}
                    </div>
                    <div className="quiz-view-wrapper" style={{ display: 'grid' }}>
                        {
                            time &&
                            <Timer className="quiz-view-wrapper-timer" expiryTimestamp={time} /*onExpire={handleSubmit}*/ />
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
                                            <p key={index}>{question.question.description} ({question.question.defaultGrade}p)</p>
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
                    <Button className="btn btn-success quiz-view-submit" onClick={handleSubmit}>Submit</Button>
                </> :
                <div>This quiz is expired</div>
            }
        </Container>
    );
}

export default withRouter(QuizAttempt);