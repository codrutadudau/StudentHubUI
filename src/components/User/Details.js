import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { Container, Form, Button, Card } from 'react-bootstrap';

import mainLogo from '../../assets/images/avatar.jpg';
import '../../scss/profile.scss';

import { getUserById } from '../../actions/user';

export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getUserById(params.id));
    }, []);

    const user = useSelector(state => state.userReducer.user);
    
    return (
        <div className="page-content">
            <Container className="d-flex justify-content-center profile">
                <Card className="profile-info">
                    <Card.Body className="profile-info-card">
                        <img src={mainLogo} />
                        <span className="profile-info-card-text">{user.firstName} {user.lastName}</span>
                        <span className="profile-info-card-text">Full Stack Developer</span>
                        <span className="profile-info-card-text">Bay Area, San Francisco, CA</span>
                    </Card.Body>
                </Card>
                <Card className="profile-data">
                    <Card.Body className="profile-data-card">
                        <Form className="profile-data-card-edit-profile">
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="firstName"
                                    id="firstName"
                                    disabled={true}
                                    value={user.firstName}
                                />
                            </Form.Group>
                            <hr />
                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="lastName"
                                    id="lastName"
                                    disabled={true}
                                    value={user.lastName}
                                />
                            </Form.Group>
                            <hr />
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    disabled={true}
                                    value={user.email}
                                />
                            </Form.Group>
                            <hr />
                            <Button type="submit" className="mt-3 auth-inner-submit">Edit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
