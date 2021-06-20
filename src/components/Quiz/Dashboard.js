import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import DeleteQuiz from '../Modals/DeleteQuiz';

import '../../assets/scss/quiz.scss';

import { getAllQuizzes, getAllQuizzesForTeacherId } from '../../actions/quiz';
import { getAllTeachers } from '../../actions/teacher';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({
        id: "",
        name: ""
    });
    
    const me = useSelector(state => state.userReducer.me);
    const quizzes = useSelector(state => state.quizReducer.quizzes);
    const teacherReducer = useSelector(state => state.teacherReducer);

    useEffect(() => {
        switch (props.role) {
            case process.env.ROLE_ADMIN:
                
            break;
            case process.env.ROLE_TEACHER:
                dispatch(getAllTeachers(me.id));
            break;
            default: break;
        }
    }, []);
    
    useEffect(() => {
        if (process.env.ROLE_TEACHER === props.role) {
            if (teacherReducer.teachers) {
                dispatch(getAllQuizzesForTeacherId(teacherReducer.teachers[0].id));
            }
        } else {
            dispatch(getAllQuizzes());
        }
    }, [teacherReducer.teachers]);

    const handleClick = (e, quiz, action) => {
        e.preventDefault();

        if (!quiz) {
            history.push(`/quizzes/${action}`);
        } else {
            history.push(`/quiz/${quiz.id}/${action}`, quiz);
        }
    };

    return (
        <Container className="d-flex justify-content-center quizzes">
            <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success quizzes-new">
                <AddCircleOutlineIcon className="quizzes-new-icon" />
                <span className="quizzes-new-button">Add new quiz</span>
            </div>
            <DeleteQuiz
                show={modalShow} 
                onHide={() => setModalShow(false)}
                id={modalData.id}
                name={modalData.name}
            />
            {
                !isEmpty(quizzes) ?
                    <table className={`table table-striped quiz-table`}>
                    <thead>
                        <tr className="quiz-table-header">
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            map(quizzes, (quiz, value) => {
                                return (
                                    <tr key={value}>
                                        <th scope="row">{value + 1}</th>
                                        <td>{quiz.name}</td>
                                        <td>{quiz.courseName}</td>
                                        <td>
                                            <EditIcon onClick={e => handleClick(e, quiz, 'edit')} className="quiz-table-icon quiz-table-icon--edit" />
                                            <DeleteIcon
                                                onClick={() => { setModalShow(true); setModalData({ id: quiz.id, name: quiz.name }) }}
                                                className="quiz-table-icon quiz-table-icon--delete"
                                            />
                                            <VisibilityIcon onClick={e => handleClick(e, quiz, 'view')} className="quiz-table-icon quiz-table-icon--view" />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table> :
                <p>No quizzes available</p>
            }
        </Container>
    );
}
