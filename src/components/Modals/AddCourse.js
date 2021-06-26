import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';

import { getAllTeachersWithName } from '../../actions/teacher';
import { createCourse, editCourse, getAllCoursesWithTeacherName, getCourseById } from '../../actions/course';

export default function AddCourse(props) {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        name: "",
        userTeacher: "",
    });

    const teacherUsers = useSelector(state => state.teacherReducer.teachersWithName);
    const course = useSelector(state => state.courseReducer.course);

    useEffect(() => {
        dispatch(getAllTeachersWithName());
    }, []);

    useEffect(() => {
        if (props.data && props.data.action === 'edit') {
            dispatch(getCourseById(props.data.id));
        }
    }, [props.data]);

    useEffect(() => {
        if (course && props.data && props.data.action === 'edit') {
            setPayload({
                name: course.name,
                userTeacher: course.userTeacher.id
            });
        } else {
            setPayload({
                name: "",
                userTeacher: ""
            });
        }
    }, [course, props.data]);

    const handleSubmit = e => {
        if (props.data.action === 'create') {
            dispatch(createCourse(payload)).then(() => {
                dispatch(getAllCoursesWithTeacherName());
            });
        } else {
            dispatch(editCourse(course.id, payload)).then(() => {
                dispatch(getAllCoursesWithTeacherName());
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

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="add-course-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                { props.data && props.data.action === "create" ? "Add" : "Edit" } Course
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="add-course-modal-form">
                    <Form.Label className="add-course-modal-form-label">Course Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleOnChange}
                        value={payload.name}
                    />
                    <Form.Label className="add-course-modal-form-label">Teacher</Form.Label>
                    <Form.Control as="select" name="userTeacher" onChange={handleOnChange} value={payload.userTeacher}>
                        <option value="">Select a teacher</option>
                        {
                            map(teacherUsers, (teacher, index) => {
                                return (
                                    <option
                                        key={index} 
                                        value={teacher.id}
                                    >
                                        {teacher.name}
                                    </option>
                                );
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleSubmit}>Submit</Button>
            <Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
        </Modal>
    );
}
