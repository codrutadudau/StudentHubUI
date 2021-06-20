import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map';

import { getAllQuizzes } from '../../actions/quiz';
import { assignQuiz } from '../../actions/quizInstance';
import { getClassroomStudents } from '../../actions/classroom';

export default function AssignQuiz(props) {
    const dispatch = useDispatch();
    const quizzes = useSelector(state => state.quizReducer.quizzes);
    const classroomReducer = useSelector(state => state.classroomReducer);
    const [selectedQuiz, setSelectedQuiz] = useState();

    useEffect(() => {
        if (props && props.data && props.data.courseId) {
            dispatch(getAllQuizzes(props.data.courseId));
        }
    }, [props]);

    useEffect(() => {
        if (props && props.data && props.data.classroomId) {
            dispatch(getClassroomStudents(props.data.classroomId));
        }
    }, [props && props.data && props.data.classroomId]);

    // const handleClick = e => {
    //     dispatch(deleteAnswer(props.data.id)).then(() => {
    //         dispatch(getAnswersByQuestionId(props.data.questionId));
    //     });

    //     props.onHide();
    // }

    const handleSelectChange = e => {
        e.preventDefault();

        setSelectedQuiz(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();

        //we're assigning the quiz to the whole classroom
        if (props.data.classroomId) {
            map(classroomReducer.classroomStudents, student => {
                if (student.hasInProgressQuizzes === 0) {
                    dispatch(assignQuiz({
                        assignedBy: props.data.teacherId,
                        userStudent: student.studentId,
                        quiz: selectedQuiz,
                    }));
                }
            });

            return;
        }

        // we're assigning the quiz to a single user
        dispatch(assignQuiz({
            assignedBy: props.data.teacherId,
            userStudent: props.data.studentId,
            quiz: selectedQuiz,
        }));
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-quiz-modal"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Assign Quiz
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="quiz-select">
                    <Form.Label>Assign a quiz</Form.Label>
                    <Form.Control as="select" onChange={handleSelectChange}>
                        <option>Select a quiz</option>
                    {
                        map(quizzes, (quiz, index) => {
                            return (
                                <option key={index} value={quiz.id}>{quiz.name}</option>
                            );
                        })
                    }
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleClick}>Assign</Button>
            <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
        </Modal>
    );
}
