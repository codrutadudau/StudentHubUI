import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteQuestion from '../Modals/DeleteQuestion';

import { getAllQuestions } from '../../actions/question';

import '../../assets/scss/question.scss';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({
        id: "",
        description: ""
    });

    useEffect(() => {
        dispatch(getAllQuestions());
    }, []);

    const handleClick = (e, question, action) => {
        e.preventDefault();

        if (!question) {
            history.push(`/questions/${action}`);
        } else {
            history.push(`/question/${question.id}/${action}`, question);
        }
    };

    const questions = useSelector(state => state.questionReducer.questions);

    return (
        <div className="page-content">
            <Container className="d-flex justify-content-center questions">
                <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success questions-new">
                    <AddCircleOutlineIcon className="quizzes-new-icon" />
                    <span className="quizzes-new-button">Add new question</span>
                </div>
                <DeleteQuestion
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={modalData.id}
                    description={modalData.description}
                />
                {
                    !isEmpty(questions) ?
                        <table className="table table-striped question-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Description</th>
                                <th scope="col">Default grade</th>
                                <th scope="col">Has multiple answers</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                map(questions, (question, value) => {
                                    return (
                                        <tr key={value}>
                                            <th scope="row">{value + 1}</th>
                                            <td>{question.description}</td>
                                            <td>{question.defaultGrade}</td>
                                            <td>{question.hasMultipleAnswers ? 'Yes' : 'No'}</td>
                                            <td>
                                                <EditIcon onClick={e => handleClick(e, question, 'edit')} className="question-table-icon question-table-icon--edit" />
                                                <DeleteIcon
                                                    onClick={() => { setModalShow(true); setModalData({ id: question.id, description: question.description }) }} 
                                                    className="question-table-icon question-table-icon--delete"
                                                />
                                                <VisibilityIcon onClick={e => handleClick(e, question, 'view')} className="question-table-icon question-table-icon--view" />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table> :
                    <p>No questions available</p>
                }
            </Container>
        </div>
    );
}
