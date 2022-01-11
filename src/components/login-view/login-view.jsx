import React, { useState } from 'react';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setOwnername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("user: " + username + " | password: " + password);
        // Send a request to the server for authentication, then call props.onLoggedIn(username) 
        props.onLoggedIn(username);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Header>myGarage Login</Card.Header>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setOwnername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Sign In
                                </Button>
                            </Form>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}