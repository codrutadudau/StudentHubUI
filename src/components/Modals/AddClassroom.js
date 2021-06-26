import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { createClassroom, getClassroomById, editClassroom, getClassrooms, getClassroomCourses, deleteClassroomCourse, addClassroomCourse } from '../../actions/classroom';
import { getAllCourses } from '../../actions/course';

export default function AddClassroom(props) {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        name: "",
        year: "",
    });

    const classrooms = useSelector(state => state.classroomReducer.classrooms);
    const classroom = useSelector(state => state.classroomReducer.classroom);
    const classroomCourses = useSelector(state => state.classroomReducer.classroomCourses);
    const courses = useSelector(state => state.courseReducer.courses);

    useEffect(() => {
        if (props.data && props.data.action === 'edit') {
            dispatch(getClassroomById(props.data.id));
            dispatch(getClassroomCourses(props.data.id)).then(() => {
                dispatch(getAllCourses());
            });
        }
    }, [props.data]);

    useEffect(() => {
        if (classroom && props.data && props.data.action === 'edit') {
            setPayload({
                name: classroom.name,
                year: classroom.year
            });
        } else {
            setPayload({
                name: "",
                year: ""
            });
        }
    }, [classroom, props.data]);

    const handleSubmit = e => {
        if (props.data.action === 'create') {
            dispatch(createClassroom(payload)).then(() => {
                dispatch(getClassrooms());
            });
        } else {
            dispatch(editClassroom(classroom.id, payload)).then(() => {
                dispatch(getClassrooms());
            });
        }

        props.onHide();
    }

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleDeleteClassroomCourse = (e, classroomId, courseId) => {
        dispatch(deleteClassroomCourse(classroomId, courseId)).then(() => {
            dispatch(getClassroomCourses(props.data.id));
        });
    }

    const handleAddClassroomCourse = (e, classroomId, courseId) => {
        dispatch(addClassroomCourse(classroomId, courseId)).then(() => {
            dispatch(getClassroomCourses(props.data.id));
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="add-classroom-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                { props.data && props.data.action === "create" ? "Add" : "Edit" } Classroom
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="add-classroom-modal-form">
                    <Form.Label className="add-classroom-modal-form-label">Classroom Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleOnChange}
                        value={payload.name}
                    />
                    <Form.Label className="add-classroom-modal-form-label">Year</Form.Label>
                    <Form.Control
                        type="text"
                        name="year"
                        onChange={handleOnChange}
                        value={payload.year}
                    />
                </Form.Group>
            </Form>
            {
                props.data && props.data.action === 'edit' &&
                <div className="add-classroom-modal-classroom-courses">
                    {
                        <>
                            <div className="add-classroom-modal-classroom-courses-existing">
                                {
                                    !isEmpty(classroomCourses) &&
                                    <div>
                                        <h4>Classroom Courses</h4>
                                        {
                                            map(classroomCourses, (course, index) => {
                                                return (
                                                    <div className="add-classroom-modal-classroom-courses-existing-item" key={index}>
                                                        {course.courseName} <DeleteIcon className="user-table-icon user-table-icon--red" onClick={e => handleDeleteClassroomCourse(e, classroom.id, course.courseId)} />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            <div  className="add-classroom-modal-classroom-courses-add">
                                <h4>Add Course</h4>
                                {
                                    map(courses, (course, index) => {
                                        return (
                                            <div className="add-classroom-modal-classroom-courses-add-item" key={index}>
                                                {course.name} <AddCircleOutlineIcon onClick={e => handleAddClassroomCourse(e, classroom.id, course.id)}/>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
        </Modal>
    );
}
