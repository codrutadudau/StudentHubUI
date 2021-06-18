import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import { getTeacherCourses, getAllTeachers } from '../../actions/teacher';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const me = useSelector(state => state.userReducer.me);
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
        if (!isEmpty(teacherReducer.teachers)) {
            dispatch(getTeacherCourses(teacherReducer.teachers.pop().id));
        }
    }, [teacherReducer.teachers]);

    return (
        teacherReducer.teacherCourses &&
        <Container className="d-flex justify-content-center">
            {
                map(teacherReducer.teacherCourses, (course, index) => {
                    return (
                        <div key={index}>
                            {course.course.name}
                            {
                                map(course.classrooms, (classroom, index) => {
                                    return (
                                        <p key={index}>
                                            {classroom.name}
                                        </p>
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
