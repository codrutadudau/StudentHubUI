import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getClassroomById, getClassrooms, deleteClassroom } from '../../actions/classroom';

export default function DeleteClassroom(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    const classroom = useSelector(state => state.classroomReducer.classroom);
    
    useEffect(() => {
        if (props.data && props.data.id) {
            dispatch(getClassroomById(props.data.id));
        }
    }, [props.data]);

    useEffect(() => {
        if (classroom) {
            setName(classroom.name);
        }
    }, [classroom]);

    const handleClick = e => {
        dispatch(deleteClassroom(props.data.id)).then(() => {
            dispatch(getClassrooms());
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="delete-course-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete Classroom
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete the classroom <span className="quiz-modal-name">{name}</span>? It will be deleted only if it has no associated courses.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
