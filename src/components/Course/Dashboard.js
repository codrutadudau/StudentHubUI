import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import MailIcon from '@material-ui/icons/Mail';

import AssignQuiz from '../Modals/AssignQuiz';

import '../../assets/scss/course.scss';

import { getTeacherCourses, getAllTeachers } from '../../actions/teacher';
import { getClassroomStudents } from '../../actions/classroom';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [classroomStudents, setClassroomStudents] = useState();
    const [modalShow, setModalShow] = useState();
    const [modalData, setModalData] = useState();

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

    const handleClick = (e, classroom) => {
        e.preventDefault();

        dispatch(getClassroomStudents(classroom.id))
            .then(() => {
                setClassroomStudents({
                    ...classroomStudents,
                    [`show-${classroom.name}`]: classroomStudents && `show-${classroom.name}` in classroomStudents ? !classroomStudents[`show-${classroom.name}`] : true,
                    [classroom.name]: classroomReducer.classroomStudents
                });
            });
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
                        <div key={index}>
                            <h3>{course.course.name}</h3>
                            {
                                map(course.classrooms, (classroom, index) => {
                                    return (
                                        <div key={index}>
                                            {classroom.name} <div className="btn btn-success" onClick={e => handleClassroomQuizAssignment(e, classroom, course.course)}>Quiz classroom assignment</div>
                                            {
                                                classroomStudents && `${classroom.name}` in classroomStudents && classroomStudents[`show-${classroom.name}`] ?
                                                <ExpandMoreIcon onClick={e => handleClick(e, classroom)}/> :
                                                <ExpandLessIcon onClick={e => handleClick(e, classroom)}/>
                                            }
                                            <div>
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
                    );
                })
            }
        </Container>
    );
}
