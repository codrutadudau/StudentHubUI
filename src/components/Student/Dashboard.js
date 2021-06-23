import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import map from 'lodash/map';
import has from 'lodash/has';

import { getQuizInstancesByUser } from '../../actions/quizInstance';

import '../../assets/scss/student.scss';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [quizzesByCourse, setQuizzesByCourse] = useState();

    const me = useSelector(state => state.userReducer.me);
    const quizzes = useSelector(state => state.quizInstanceReducer.quizzes);

    useEffect(() => {
        if (me) {
            dispatch(getQuizInstancesByUser(me.id));
        }
    }, [me]);

    useEffect(() => {
        if (quizzes) {
            let groupedQuizzes = {};
            map(quizzes, quiz => {
                if (!has(groupedQuizzes, quiz.quiz.course.name)) {
                    groupedQuizzes[quiz.quiz.course.name] = [];
                }
                
                groupedQuizzes[quiz.quiz.course.name].push(quiz);
            });

            setQuizzesByCourse(groupedQuizzes);
        }
    }, [quizzes]);

    return (
        <Container className="d-flex justify-content-center dashboard">
            <h2 className="dashboard-title">Student dashboard</h2>
            {
                quizzesByCourse &&
                <div className="dashboard-courses">
                    {
                        map(quizzesByCourse, (quiz, courseName) =>{
                        return (
                            <div key={courseName} className="dashboard-courses-item">
                                <h5 className="dashboard-courses-item-course-name">{courseName}</h5>
                                {
                                    map(quiz, (quiz, index) => {
                                        return (
                                            <div key={index}>
                                                <p className="dashboard-courses-item-quiz-name">{quiz.quiz.name}</p>
                                                <LinearProgress className="dashboard-courses-item-progressbar" variant="determinate" value={quiz.grade * 10} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                    }
                </div>
            }
        </Container>
    );
}
