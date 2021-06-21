import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import AssignQuiz from '../Modals/AssignQuiz';

import '../../assets/scss/teacher.scss';

import { getTeacherCourses, getAllTeachers } from '../../actions/teacher';
import { getClassroomStudents } from '../../actions/classroom';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [classroomStudents, setClassroomStudents] = useState();
    const [modalShow, setModalShow] = useState();
    const [modalData, setModalData] = useState();
    const [activeClassroom, setActiveClassroom] = useState();

    const me = useSelector(state => state.userReducer.me);
    const teacherReducer = useSelector(state => state.teacherReducer);
    const classroomReducer = useSelector(state => state.classroomReducer);

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
            dispatch(getTeacherCourses(teacherReducer.teachers[0].id));
        }
    }, [teacherReducer.teachers]);

    useEffect(() => {
        if (activeClassroom) {
            dispatch(getClassroomStudents(activeClassroom.id));
        }
    }, [activeClassroom]);

    useEffect(() => {
        if (activeClassroom && classroomReducer.classroomStudents) {
            setClassroomStudents({
                ...classroomStudents,
                [`show-${activeClassroom.name}`]: classroomStudents && `show-${activeClassroom.name}` in classroomStudents ? !classroomStudents[`show-${activeClassroom.name}`] : true,
                [activeClassroom.name]: classroomReducer.classroomStudents
            });
        }
    }, [classroomReducer.classroomStudents]);

    const handleClick = (e, classroom) => {
        e.preventDefault();
        setActiveClassroom(classroom);
    }

    const handleAssignQuizClick = (e, student, course) => {
        e.preventDefault();
        setModalData({
            ...modalData,
            teacherId: teacherReducer.teachers[0].id,
            studentId: student.studentId,
            courseId: course.id
        });
        setModalShow(true);
    }

    const handleClassroomQuizAssignment = (e, classroom, course) => {
        e.preventDefault();
        setModalData({
            ...modalData,
            teacherId: teacherReducer.teachers[0].id,
            courseId: course.id,
            classroomId: classroom.id,
        });
        setModalShow(true);
    }

    return (
        teacherReducer.teacherCourses &&
        <Container className="d-flex justify-content-center courses">
            <AssignQuiz 
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            {
                map(teacherReducer.teacherCourses, (course, index) => {
                    return (
                        <>
                            <h3 className="courses-title">{course.course.name}</h3>
                            <div className="courses-list" key={index}>
                                <div className="courses-classrooms">
                                    {
                                        map(course.classrooms, (classroom, index) => {
                                            return (
                                                <div className="courses-classrooms-item" key={index}>
                                                    <span className="courses-classrooms-item-name">{classroom.name}</span>
                                                    <div className="btn btn-success courses-classrooms-item-assign-button" onClick={e => handleClassroomQuizAssignment(e, classroom, course.course)}> <AssignmentTurnedInIcon />Classroom assignment</div>
                                                    {
                                                        classroomStudents && `${classroom.name}` in classroomStudents && classroomStudents[`show-${classroom.name}`] ?
                                                        null : 
                                                        <ExpandMoreIcon onClick={e => handleClick(e, classroom)}/>
                                                    }
                                                    <div className="courses-classrooms-item-students">
                                                        {
                                                            classroomStudents && `${classroom.name}` in classroomStudents && classroomStudents[`show-${classroom.name}`] &&
                                                            map(classroomStudents[classroom.name], (student, index) => {
                                                                return (
                                                                    <p key={index}>
                                                                        {student.firstName} {student.lastName} {student.hasInProgressQuizzes === 0 && <FiberNewIcon onClick={e => handleAssignQuizClick(e, student, course.course)} />} <MailIcon />
                                                                    </p>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    );
                })
            }
        </Container>
    );
}
