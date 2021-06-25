import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, withRouter, useHistory } from "react-router";
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import "react-datetime/css/react-datetime.css";

import AddQuizQuestion from '../Modals/AddQuizQuestion';
import DeleteQuizQuestion from '../Modals/DeleteQuizQuestion';

import { getQuizById, createQuiz, editQuiz } from '../../actions/quiz';
import { getQuestionsByQuizId } from '../../actions/question';
import { getAllCourses } from '../../actions/course';

export function EditClassroom({ location: { state } }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const me = useSelector(state => state.userReducer.me);
    const quiz = useSelector(state => state.quizReducer.quiz);
    const questions = useSelector(state => state.questionReducer.quizQuestions);
    const courses = useSelector(state => state.courseReducer.courses);

    const [payload, setPayload] = useState({
        name: "",
        quizIntro: "",
        timeOpen: "",
        timeClose: "",
        password: "",
        course: "",
        duration: "",
    });
    const [editModalShow, setEditModalShow] = useState(false);
    const [editModalData, setEditModalData] = useState({
        id: "",
        description: "",
        hasMultipleAnswers: "",
        defaultGrade: "",
        quizId: ""
    });
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState({
        id: "",
        description: "",
        quizId: "",
        quizName: ""
    });

    useEffect(() => {
        if (!isEmpty(params) && !state) {
            dispatch(getQuizById(params.id));
        }
    }, []);
    
    useEffect(() => {
        if (state) {
            setPayloadForm(state);
        }
    }, [state]);

    useEffect(() => {
        if (!state && quiz && location.pathname.includes('/edit')) {
            setPayloadForm(quiz);
        }
    }, [quiz]);

    useEffect(() => {
        if (params.id) {
            dispatch(getQuestionsByQuizId(params.id));
        }
    }, []);

    useEffect(() => {
        switch (me.role.name) {
            case process.env.ROLE_ADMIN:
                dispatch(getAllCourses());
            break;
            case process.env.ROLE_TEACHER:
                dispatch(getAllCourses(me.id));
            break;
            default: break;
        }
    }, [me]);

    const setPayloadForm = (state) => {
        setPayload({
            ...payload,
            name: state.name,
            quizIntro: state.quizIntro,
            timeOpen: new Date(state.timeOpen),
            timeClose: new Date(state.timeClose),
            password: state.password,
            course: state.courseId,
            duration: state.duration,
        });
    }

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    const handleOnChangeTimeOpen = e => {
        setPayload({
            ...payload,
            timeOpen: new Date(e.toString())
        });
    }

    const handleOnChangeTimeClose = e => {
        setPayload({
            ...payload,
            timeClose: new Date(e.toString())
        });
    }

    const handleClick = (e, question, action) => {
        setEditModalShow(true);
        if (action === 'create') {
            setEditModalData({
                id: "",
                description: "",
                hasMultipleAnswers: "",
                defaultGrade: "",
                quizId: params.id
            });
        } else {
            setEditModalData({
                id: question.id,
                description: question.description,
                hasMultipleAnswers: question.hasMultipleAnswers + '',
                defaultGrade: question.defaultGrade,
                quizId: params.id
            });
        }
    }

    const handleDeleteClick = (e, question) => {
        e.preventDefault();

        setDeleteModalShow(true);
        setDeleteModalData({
            id: question.id,
            description: question.description,
            quizId: params.id,
            quizName: payload.name
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (location.pathname.includes('/create')) {
            dispatch(
                createQuiz({
                    ...payload,
                    timeOpen: (payload.timeOpen).toISOString(),
                    timeClose: (payload.timeClose).toISOString()
                })
            ).then(() => {
                history.push('/quizzes');
            });

            return;
        }

        dispatch(
            editQuiz(
                params.id,
                {
                    ...payload,
                    timeOpen: (payload.timeOpen).toISOString(),
                    timeClose: (payload.timeClose).toISOString()
                }
            )
        ).then(() => {
            history.push('/quizzes');
        });
    }

    return (
        <Container className="d-flex justify-content-center quiz">
            <AddQuizQuestion
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                data={editModalData}
            />
            <DeleteQuizQuestion
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                data={deleteModalData}
            />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="quiz-form">
                    <Form.Label className="quiz-form-label">Quiz Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleOnChange}
                        value={payload.name}
                    />
                    <Form.Label className="quiz-form-label">Quiz Intro</Form.Label>
                    <Form.Control
                        type="text"
                        name="quizIntro"
                        onChange={handleOnChange}
                        value={payload.quizIntro}
                    />
                    <Form.Label className="quiz-form-label">Time Open</Form.Label>
                    <Datetime
                        value={payload.timeOpen}
                        onChange={handleOnChangeTimeOpen}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        utc={true}
                    />
                    <Form.Label className="quiz-form-label">Time Close</Form.Label>
                    <Datetime
                        value={payload.timeClose}
                        onChange={handleOnChangeTimeClose}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        utc={true}
                    />
                    <Form.Label className="quiz-form-label">Password</Form.Label>
                    <Form.Control
                        type="text"
                        name="password"
                        onChange={handleOnChange}
                        value={payload.password}
                    />
                    <Form.Label className="quiz-form-label">Course</Form.Label>
                    <Form.Control as="select" name="course" onChange={handleOnChange} value={payload.course}>
                        <option value="">Select a course</option>
                        {
                            map(courses, (course, index) => {
                                return (
                                    <option
                                        key={index} 
                                        value={course.id}
                                    >
                                        {course.name}
                                    </option>
                                );
                            })
                        }
                    </Form.Control>
                    <Form.Label className="quiz-form-label">Duration (in minutes)</Form.Label>
                    <Form.Control
                        type="text"
                        name="duration"
                        onChange={handleOnChange}
                        value={payload.duration}
                    />
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
            {
                params.id ?
                <div className="quiz-questions">
                    <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success quiz-questions-new">
                        <AddCircleOutlineIcon className="quiz-questions-new-icon" />
                        <span className="quiz-question-new-button">Add quiz question</span>
                    </div>
                    <div className="quiz-questions-list">
                        {
                            !isEmpty(questions) ?
                                <table className={`table table-striped quiz-questions-list-table`}>
                                    <thead>
                                        <tr className="quiz-questions-list-table-header">
                                            <th scope="col"></th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            map(questions, (question, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{question.question.description}</td>
                                                        <td>
                                                            <EditIcon onClick={e => handleClick(e, question.question, 'edit')} className="quiz-questions-list-table-icon quiz-questions-list-table-icon--edit" />
                                                            <DeleteIcon onClick={e => handleDeleteClick(e, question.question)} className="quiz-questions-list-table-icon quiz-questions-list-table-icon--delete" />
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table> :
                                <p>This quiz has no questions available</p>
                        }
                    </div>
                </div> :
                <div></div>
            }
        </Container>
    );
}

export default withRouter(EditClassroom);
