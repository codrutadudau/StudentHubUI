import React, { useRef } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap' 
import { Link } from 'react-router-dom';

export default function Signin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    return (
        <Container className="d-flex align-items-center justify-content-center auth">
            <div className="w-100 auth-inner">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign in</h2>
                        <Form>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required></Form.Control>
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