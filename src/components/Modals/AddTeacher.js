import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';

import { getAllUsers } from '../../actions/user';
import { getAllCourses } from '../../actions/course';
import { getAllTeachersWithName, createTeacher } from '../../actions/teacher';

export default function AddTeacher(props) {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        userId: "",
    });

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllCourses());
    }, []);
    
    const users = useSelector(state => state.userReducer.users);
    const courses = useSelector(state => state.courseReducer.courses);

    useEffect(() => {
        if (props.data && props.data.action === 'edit') {
            setPayload({
                userId: "",
            });
        } else {
            setPayload({
                userId: "",
            });
        }
    }, [props.data]);

    const handleSubmit = e => {
        if (props.data.action === 'create') {
            dispatch(createTeacher(payload)).then(() => {
                dispatch(getAllTeachersWithName());
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
            className="add-teacher-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                { props.data && props.data.action === "create" ? "Add" : "Edit" } Teacher
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="add-teacher-modal-form">
                    <Form.Label className="add-teacher-modal-form-label">Teacher</Form.Label>
                    <Form.Control as="select" name="userId" onChange={handleOnChange} value={payload.userId}>
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
