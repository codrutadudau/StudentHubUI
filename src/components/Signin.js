import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap' 
import { Link } from 'react-router-dom';
import { authApi } from '../api';

export default function Signin() {
    const [credentials, setCredentials] = useState({ 
        email: "",
        password: ""
    });
    
    const handleSubmit = e => {
        e.preventDefault();
        
        authApi.signIn(credentials.email, credentials.password);
    }
    
    return (
        <Container className="d-flex align-items-center justify-content-center auth">
            <div className="w-100 auth-inner">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign in</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" id="email" onChange={ e => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={ e => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} required></Form.Control>
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
    );
}