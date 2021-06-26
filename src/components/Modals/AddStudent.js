import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';

import { getClassrooms } from '../../actions/classroom';
import { getStudentById, getAllStudentsWithName, createStudent, editStudent } from '../../actions/student';
import { getAllUsers } from '../../actions/user';

export default function AddStudent(props) {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        identificationNumber: "",
        classroomId: "",
        user: ""
    });

    const student = useSelector(state => state.studentReducer.student);
    const classrooms = useSelector(state => state.classroomReducer.classrooms);
    const users = useSelector(state => state.userReducer.users);

    useEffect(() => {
        if (props.data && props.data.action === 'edit') {
            dispatch(getAllUsers());
            dispatch(getStudentById(props.data.id));
        }
    }, [props.data]);

    useEffect(() => {
        dispatch(getClassrooms());
    });

    useEffect(() => {
        if (student && props.data && props.data.action === 'edit') {
            setPayload({
                identificationNumber: student.identificationNumber,
                user: student.user.id,
                classroom: student.classroom.id
            });
        } else {
            setPayload({
                identificationNumber: "",
                user: "",
                classroom: "",
            });
        }
    }, [student, props.data]);

    const handleSubmit = e => {
        if (props.data.action === 'create') {
            dispatch(createStudent(payload)).then(() => {
                dispatch(getAllStudentsWithName());
            });
        } else {
            dispatch(editStudent(props.data.id, payload)).then(() => {
                dispatch(getAllStudentsWithName());
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
                { props.data && props.data.action === "create" ? "Add" : "Edit" } Student
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="add-course-modal-form">
                    <Form.Label className="add-teacher-modal-form-label">Student</Form.Label>
                    <Form.Control as="select" name="user" onChange={handleOnChange} value={payload.user}>
                        <option value="">Select an user</option>
                        {
                            map(users, (user, index) => {
                                return (
                                    <option
                                        key={index} 
                                        value={user.id}
                                    >
                                        {user.firstName} {user.lastName}
                                    </option>
                                );
                            })
                        }
                    </Form.Control>
                    <Form.Label className="add-course-modal-form-label">Identification Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="identificationNumber"
                        onChange={handleOnChange}
                        value={payload.identificationNumber}
                    />
                    <Form.Label className="add-course-modal-form-label">Classroom</Form.Label>
                    <Form.Control as="select" name="classroom" onChange={handleOnChange} value={payload.classroom}>
                        <option value="">Select a classroom</option>
                        {
                            map(classrooms, (classroom, index) => {
                                return (
                                    <option
                                        key={index} 
                                        value={classroom.id}
                                    >
                                        {classroom.name}
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
