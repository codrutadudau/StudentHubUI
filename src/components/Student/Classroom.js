import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map';

import { getStudentClassroom, getClassroomStudents } from '../../actions/classroom';

import '../../assets/scss/classroom.scss';

export default function Classroom() {
    const dispatch = useDispatch();

    const me = useSelector(state => state.userReducer.me);
    const classroom = useSelector(state => state.classroomReducer.classroom);
    const classroomStudents = useSelector(state => state.classroomReducer.classroomStudents);

    useEffect(() => {
        dispatch(getStudentClassroom(me.id));
    }, [me]);

    useEffect(() => {
        if (classroom && classroom[0]) {
            dispatch(getClassroomStudents(classroom[0].id));
        }
    }, [classroom]);

    return (
        classroom &&
        <Container className="d-flex justify-content-center classroom">
            <h2 className="classroom-name">{classroom[0].name}</h2>
            {
                classroomStudents &&
                <div className="classroom-students">
                    {
                        map(classroomStudents, (student, index) => {
                            return (
                                <p key={index} className="classroom-student-name">{index + 1}. {student.firstName} {student.lastName}</p>
                            );
                        })
                    }
                </div>
            }
        </Container>
    );
}
