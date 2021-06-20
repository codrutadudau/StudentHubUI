import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import map from 'lodash/map';

import StartQuizConfirmation from '../Modals/StartQuizConfirmation';

import { getQuizInstancesByUser } from '../../actions/quizInstance';

import '../../assets/scss/student.scss';

export default function Quizzes() {
    const dispatch = useDispatch();
    const [quizzesAssigned, setQuizzesAssigned] = useState();
    const [quizzesTaken, setQuizzesTaken] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState();

    const me = useSelector(state => state.userReducer.me);
    const quizzes = useSelector(state => state.quizInstanceReducer.quizzes);

    useEffect(() => {
        dispatch(getQuizInstancesByUser(me.id));
    }, [me]);

    useEffect(() => {
        map(quizzes, quizInstance => {
            if (quizInstance.finishedAt) {
                setQuizzesTaken({
                    ...quizzesTaken,
                    quizInstance
                });
            } else {
                setQuizzesAssigned({
                    ...quizzesAssigned,
                    quizInstance
                });
            }
        })
    }, [quizzes]);

    const handleClick = (e, quizInstance) => {
        setModalShow(true);
        setModalData(quizInstance);
    }

    return (
        <Container className="d-flex justify-content-center student-quizzes">
            <StartQuizConfirmation
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <h3>Quizzes assigned</h3>
            {
                map(quizzesAssigned, (quizInstance, index) => {
                    return (
                        <p key={index}>{quizInstance.quiz.name} <PlayCircleFilledIcon onClick={e => handleClick(e, quizInstance)} /></p>
                    );
                })
            }
            <h3>Quizzes taken</h3>
            {
                map(quizzesTaken, (quizInstance, index) => {
                    return (
                        <p key={index}>{quizInstance.quiz.name}</p>
                    );
                })
            }
        </Container>
    );
}
