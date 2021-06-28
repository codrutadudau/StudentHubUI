import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import map from 'lodash/map';
import has from 'lodash/has';

import '../../assets/scss/teacher.scss';

import { getAverageGradePerClassroom } from '../../actions/course';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [quizzesByCourse, setQuizzesByCourse] = useState();
    
    const averageGrades = useSelector(state => state.courseReducer.averageGrades);

    useEffect(() => {
        dispatch(getAverageGradePerClassroom());
    }, []);

    useEffect(() => {
        if (averageGrades) {
            let groupedByCourse = {};
            map(averageGrades, grade => {
                if (!has(groupedByCourse, grade.course)) {
                    groupedByCourse[grade.course] = [];
                }
                
                groupedByCourse[grade.course].push(grade);
            });

            setQuizzesByCourse(groupedByCourse);
        }
    }, [averageGrades]);
    
    return (
        <Container className="d-flex justify-content-center teacher-dashboard">
            <h2 className="teacher-dashboard-title">Teacher dashboard</h2>
            {
                quizzesByCourse &&
                map(quizzesByCourse, (grade, index) => {
                    return (
                        <div className="teacher-dashboard-course" key={index}>
                            <h5 className="teacher-dashboard-course-title">{index}</h5>
                            {
                                map(grade, (classroom, index) => {
                                    return (
                                        <div className="teacher-dashboard-courses-item" key={index}>
                                            <span className="teacher-dashboard-courses-item-classname">{classroom.classroom}</span>
                                            <span className="teacher-dashboard-courses-item-quizzes-taken">Quizzes taken: {classroom.quizzesTaken}</span> Average grade: {Math.round(classroom.average * 100) / 100}
                                            <LinearProgress className="dashboard-courses-item-progressbar" variant="determinate" value={classroom.average * 10} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </Container>
    );
}
