import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import map from 'lodash/map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { getAllQuestions } from '../../actions/question';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        dispatch(getAllQuestions());
    }, []);
    
    const handleClick = (e, id) => {
        e.preventDefault();

        history.push('/question/' + id);
    };

    const questions = useSelector(state => state.questionReducer.questions);
    const className = "question-table";
    
    return (
        <div className="page-content">
            <table className={`table table-striped ${className}`}>
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
                                    <td>{question.hasMultipleAnswers}</td>
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