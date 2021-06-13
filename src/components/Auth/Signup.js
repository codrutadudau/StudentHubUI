import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../Header/Header';

import { signUp } from '../../actions/auth';

export default function Signup() {
    const dispatch = useDispatch();

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: ""
    });

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            signUp(
                payload.firstName,
                payload.lastName,
                payload.email,
                payload.password,
                payload.passwordConfirm,
                payload.phoneNumber
            )
        );
    }
    return (
        <>
            <Header />
            <Container className="d-flex align-items-center justify-content-center auth">
                <div className="w-100 auth-inner">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="firstName"
                                        onChange={ e => setPayload({
                                            ...payload,
                                            firstName: e.target.value})
                                        }
                                        value={payload.firstName}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="lastName"
                                        onChange={ e => setPayload({
                                            ...payload,
                                            lastName: e.target.value})
                                        }
                                        value={payload.lastName}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        onChange={ e => setPayload({
                                            ...payload,
                                            email: e.target.value})
                                        }
                                        value={payload.email}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="password"
                                        onChange={e => setPayload({
                                            ...payload,
                                            password: e.target.value})
                                        }
                                        value={payload.password}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password confirmation</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="passwordConfirm"
                                        onChange={e => setPayload({
                                            ...payload,
                                            passwordConfirm: e.target.value})
                                        }
                                        value={payload.passwordConfirm}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="phoneNumber"
                                        onChange={e => setPayload({
                                            ...payload,
                                            phoneNumber: e.target.value})
                                        }
                                        value={payload.phoneNumber}
                                        required
                                        />
                                </Form.Group>
                                <Button type="submit" className="w-100 mt-3 auth-inner-submit">Sign up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/sign-in">Sign in</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}
