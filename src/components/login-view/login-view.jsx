import React, { useState } from 'react';
import { Container, Col, Row, Form, Button, Card, CardGroup } from 'react-bootstrap';

import axios from 'axios';

export function LoginView(props) {
    const [ownername, setOwnername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://my-garage-application.herokuapp.com/login', {
            Ownername: ownername,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such owner found')
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>myGarage Login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Ownername:</Form.Label>
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
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}