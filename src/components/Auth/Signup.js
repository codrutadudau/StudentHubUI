import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import Header from '../Header/Header';

import { signUp } from '../../actions/auth';

export default function Signup() {
    const dispatch = useDispatch();
    const registerError = useSelector(state => state.authReducer.registerError);
    
    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);
    const { vertical, horizontal, open } = snackbar;

    useEffect(() => {
        if (registerError) {
            setError(registerError.message);
        }
    }, [registerError]);

    useEffect(() => {
        if (registerError) {
            setError(registerError.message);
            setSnackbar({
                ...snackbar,
                open: true
            });
        }
    }, [registerError]);

    useEffect(() => {
        if (error && submitted) {
            setSnackbar({
                ...snackbar,
                open: true
            });
        }
    }, [error]);

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: ""
    });

    const handleChange = e => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
        setSnackbar({
            ...snackbar,
            open: false,
        });
        setError(null);
        setSubmitted(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);

        if (payload.firstName.length < 3) {
            setError("The first name should have at least 3 characters");
        } else if (payload.lastName.length < 3) {
            setError("The last name should have at least 3 characters");
        } else if (payload.password !== payload.passwordConfirm) {
            setError("The passwords are not matching");
        } else if (payload.phoneNumber.length < 10 || payload.phoneNumber.length > 15) {
            setError("The phone number should have between 10 and 15 characters");
        } else {
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
    }
    return (
        <>
            <Header />
            <Container className="d-flex align-items-center justify-content-center auth">
                <Snackbar
                    className="auth-error"
                    anchorOrigin={{ vertical, horizontal }}
                    open={snackbar.open && submitted}
                    message={error}
                    key={snackbar.vertical + snackbar.horizontal}
                />
                <div className="w-100 auth-inner">
                    <Card className="auth-inner-card">
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        value={payload.firstName}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        onChange={handleChange}
                                        value={payload.lastName}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={payload.email}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={payload.password}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password confirmation</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="passwordConfirm"
                                        onChange={handleChange}
                                        value={payload.passwordConfirm}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        value={payload.phoneNumber}
                                        required
                                        />
                                </Form.Group>
                                <Button type="submit" className="w-100 mt-3 auth-inner-submit">Sign up</Button>
                                {
                                    !error && !registerError && submitted &&
                                    <div className="auth-register-successful">
                                        Your account has been created. You'll receive an email when it will be validated by the admin.
                                    </div>
                                }
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
