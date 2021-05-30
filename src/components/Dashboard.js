import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map'

import { getAllQuizzes } from '../actions/quiz';
import Table from './Table';

export default function Dashboard() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllQuizzes());
    }, []);
    
    const quizzes = useSelector(state => state.quizReducer.quizzes);
    
    return (
        <div className="page-content">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Time opened</th>
                        <th scope="col">Time closed</th>
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
                                    <td>{quiz.timeOpen}</td>
                                    <td>{quiz.timeClose}</td>
                                    <td>
                                        <i className="fas fa-edit"></i>
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