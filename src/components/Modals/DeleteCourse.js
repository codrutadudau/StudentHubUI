import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getCourseById, deleteCourse, getAllCoursesWithTeacherName } from '../../actions/course';

export default function DeleteCourse(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    const course = useSelector(state => state.courseReducer.course);
    
    useEffect(() => {
        if (props.data && props.data.id) {
            dispatch(getCourseById(props.data.id));
        }
    }, [props.data]);

    useEffect(() => {
        if (course) {
            setName(course.name);
        }
    }, [course]);

    const handleClick = e => {
        dispatch(deleteCourse(props.data.id)).then(() => {
            dispatch(getAllCoursesWithTeacherName());
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
                Delete Course
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Do you want to delete the quiz <span className="quiz-modal-name">{name}</span>?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClick}>Yes</Button>
            <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
