import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ownername, setOwnername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://my-garage-application.herokuapp.com/owners', {
            Ownername: ownername,
            Password: password,
            Email: email,
            DOB: dob
        }).then(
            response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            }).catch(e => {
                console.log('There was an error registering the owner.');
                alert('Registering the owner was unsuccessful.')
            });
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Ownername:</Form.Label>
                <Form.Control
                    type="text"
                    value={ownername}
                    // onChange{e => setUsername(e.target.value)}
                    required
                    placeholder="Enter an owner name"
                />

            </Form.Group>

            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                    type="dob"
                    placeholder="Enter your DOB" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Ownername: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string,
        DOB: PropTypes.string
    })
};