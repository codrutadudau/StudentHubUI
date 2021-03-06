import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Card } from 'react-bootstrap';
import ImageUploader from "react-images-upload";

import '../../assets/scss/profile.scss';
import avatar from '../../assets/images/avatar.jpg';

import { getUserById } from '../../actions/user';

export default function Details() {
    const dispatch = useDispatch();
    const me = useSelector(state => state.userReducer.me);
    const [image, setImage] = useState('');

    
    useEffect(() => {
        dispatch(getUserById(me.id));
    }, []);

    const handleOnChange = e => {
        console.log(e);
    }
    
    return (
        me &&
        <Container className="d-flex justify-content-center profile">
            <div className="profile-container-first">
                
                <Card className="profile-container-first-data">
                    <Card.Body className="profile-container-first-data-card">
                        <Form className="profile-container-first-data-card-edit-profile">
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="firstName"
                                    id="firstName"
                                    disabled={true}
                                    value={me.firstName}
                                />
                            </Form.Group>
                            <hr />
                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="lastName"
                                    id="lastName"
                                    disabled={true}
                                    value={me.lastName}
                                />
                            </Form.Group>
                            <hr />
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    disabled={true}
                                    value={me.email}
                                />
                            </Form.Group>
                            <hr />
                            <Button type="submit" className="mt-3 auth-inner-submit">Edit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}
