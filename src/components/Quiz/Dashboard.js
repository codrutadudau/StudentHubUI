import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import map from 'lodash/map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { getAllQuizzes } from '../../actions/quiz';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        dispatch(getAllQuizzes());
    }, []);
    
    const handleClick = (e, id) => {
        e.preventDefault();

        history.push('/quiz/' + id);
    };

    const quizzes = useSelector(state => state.quizReducer.quizzes);
    const className = "quiz-table";
    
    return (
        <div className="page-content">
            <div className="btn btn-primary">
                Add new quiz
            </div>
            <table className={`table table-striped ${className}`}>
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
                                        <FontAwesomeIcon onClick={e => handleClick(e, value + 1)} className={`${className}-icon`} icon={faEdit} />
                                        <FontAwesomeIcon className={`${className}-icon`} icon={faTrash} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}