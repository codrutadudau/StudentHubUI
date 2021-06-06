import React, { useState, useRef } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';
import validation from './validation';

import { signUp, clearError } from '../../actions/auth';

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
    const firstNameRef = useRef();

    const [errors, setErrors] = useState({});

    const errorString = useSelector(state => state.authReducer.errorString);
    console.log(errorString);

    const handleOnChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: null
        });
        dispatch(clearError());
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validation(payload));
        console.log(errors);


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
                                    name="firstName"
                                    ref={firstNameRef}
                                    onChange={handleOnChange}
                                    value={payload.firstName}
                                />
                                {errors.firstName && <p className="error">{errors.firstName}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    onChange={handleOnChange}
                                    value={payload.lastName}
                                />
                                {errors.lastName && <p className="error">{errors.lastName}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleOnChange}
                                    value={payload.email}
                                />
                            {errors.email && <p className="error">{errors.email}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={handleOnChange}
                                    value={payload.password}
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password confirmation</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="passwordConfirm"
                                    onChange={handleOnChange}
                                    value={payload.passwordConfirm}
                                />
                                {errors.passwordConfirm && <p className="error">{errors.passwordConfirm}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleOnChange}
                                    value={payload.phoneNumber}
                                />
                                {errors.firstName && <p className="error">{errors.firstName}</p>}
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
    );
}
