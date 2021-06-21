import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getQuizInstancesByUser } from '../../actions/quizInstance';

import '../../assets/scss/student.scss';
import { map } from 'lodash';

export default function Dashboard() {
    const dispatch = useDispatch();

    const me = useSelector(state => state.userReducer.me);
    const quizzes = useSelector(state => state.quizInstanceReducer.quizzes);

    useEffect(() => {
        dispatch(getQuizInstancesByUser(me.id));
    }, [me]);

    return (
        <Container className="d-flex justify-content-center dashboard">
            Student dashboard
            <div className="dashboard-course-1">
                {
                    quizzes &&
                    map(quizzes, (quiz, index) =>{
                        return (
                            <div>
                                <p className="dashboard-course-1-quiz-name">{quiz.quiz.name}</p>
                                <LinearProgress variant="determinate" value={quiz.grade * 10} />
                            </div>
                        );
                    })
                }
            </div>
        </Container>
    );
}
