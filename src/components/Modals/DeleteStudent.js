import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { deleteStudent, getAllStudentsWithName } from '../../actions/student';

export default function DeleteStudent(props) {
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(deleteStudent(props.data.id)).then(() => {
            dispatch(getAllStudentsWithName());
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="delete-teacher-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete Student
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete this student? Its data will be deleted as well.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
