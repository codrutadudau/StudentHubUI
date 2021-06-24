import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import Header from '../Header/Header';
import '../../assets/scss/auth.scss';

import { signIn } from '../../actions/auth';
import { userMe } from '../../actions/user';

export default function Signin() {
    const loginError = useSelector(state => state.authReducer.loginError);

    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({ 
        email: "",
        password: ""
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);
    const { vertical, horizontal, open } = snackbar;

    useEffect(() => {
        if (loginError) {
            setError(loginError.message);
        }
    }, [loginError]);

    useEffect(() => {
        if (loginError) {
            setError(loginError.message);
            setSnackbar({
                ...snackbar,
                open: true
            });
        }
    }, [loginError]);
    
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);

        dispatch(signIn(credentials.email, credentials.password)).then(() => {
            dispatch(userMe());
        });
    }

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setSnackbar({
            ...snackbar,
            open: false,
        });
        setError(null);
        setSubmitted(false);
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
                            <h2 className="text-center mb-4">Sign in</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={credentials.email}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={credentials.password}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100 mt-3 auth-inner-submit">Sign in</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Don't have an account? <Link to="/sign-up">Sign up</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}
