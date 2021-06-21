import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import map from 'lodash/map';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import VisibilityIcon from '@material-ui/icons/Visibility';

import StartQuizConfirmation from '../Modals/StartQuizConfirmation';

import { getQuizInstancesByUser } from '../../actions/quizInstance';

import '../../assets/scss/student.scss';

export default function Quizzes() {
    const dispatch = useDispatch();
    const history = useHistory();
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
            if (quizInstance.finishedAt != null) {
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

    const handleViewClick = (e, quizInstance) => {
        history.push(`/quizzes/${quizInstance.id}/view`, quizInstance);
    }

    return (
        <Container className="d-flex justify-content-center student-quizzes">
            <StartQuizConfirmation
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <div className="student-quizzes-assigned">
                <h3 className="student-quizzes-taken-title">Quizzes assigned</h3>
                {
                    quizzes && quizzes[quizzes.findIndex(x => x.finishedAt == null)] ?
                    <div className="student-quizzes-taken-items">
                        {
                            map(quizzes, (quizInstance, index) => {
                                return (
                                    <p className="student-quizzes-taken-item" key={index}>{quizInstance.quiz.name} <PlayCircleFilledIcon className="student-quizzes-taken-item-icon-start" onClick={e => handleClick(e, quizInstance)} /></p>
                                );
                            })
                        }
                    </div> :
                    <div className="student-quizzes-assigned-notice">You don't have any quizzes assigned</div>
                }
            </div>
            <div className="student-quizzes-taken">
                <h3 className="student-quizzes-taken-title">Quizzes taken</h3>
                {
                    quizzes && quizzes[quizzes.findIndex(x => x.finishedAt != null)] ?
                    <div className="student-quizzes-taken-items">
                        {
                            map(quizzes, (quizInstance, index) => {
                                return (
                                    <p className="student-quizzes-taken-item" key={index}>{quizInstance.quiz.name} <VisibilityIcon className="student-quizzes-taken-item-icon-view" onClick={e => handleViewClick(e, quizInstance)} /></p>
                                );
                            })
                        }
                    </div> :
                    <div className="student-quizzes-assigned-notice">You don't have any taken quizzes</div>
                }
            </div>
        </Container>
    );
}
