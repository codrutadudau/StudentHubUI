import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../../assets/scss/quiz.scss';

import { getAllQuizzes } from '../../actions/quiz';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        dispatch(getAllQuizzes());
    }, []);
    
    const quizzes = useSelector(state => state.quizReducer.quizzes);

    const handleClick = (e, quiz, action) => {
        e.preventDefault();

        if (!quiz.id) {
            history.push(`/quizzes/${action}`);
        } else {
            history.push(`/quiz/${quiz.id}/${action}`, quiz);
        }
    };

    return (
        <div className="page-content">
            <Container className="d-flex justify-content-center quizzes">
                <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success quizzes-new">
                    <AddCircleOutlineIcon className="quizzes-new-icon" />
                    <span className="quizzes-new-button">Add new quiz</span>
                </div>
                <table className={`table table-striped quiz-table`}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
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
                                        <td>
                                            <EditIcon onClick={e => handleClick(e, quiz, 'edit')} className={`quiz-table-icon`} />
                                            <DeleteIcon onClick={e => handleClick(e, quiz, 'delete')} className={`quiz-table-icon`} />
                                            <VisibilityIcon onClick={e => handleClick(e, quiz, 'view')} className={`$quiz-table-icon`} />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </Container>
        </div>
    );
}
