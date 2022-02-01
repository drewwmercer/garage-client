import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

import './navbar.scss'

export class Navigation extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    render() {
        const { owner } = this.props
        const vehicles = `/`;
        const profile = `/owner/id/${owner}`;

        return (

            <Navbar bg="light" expand="lg">
                {/* <Container> */}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/"><Navbar.Brand href="#home">myGarage</Navbar.Brand></Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Owner" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">My VehiclesList</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>

        );
    }
}
