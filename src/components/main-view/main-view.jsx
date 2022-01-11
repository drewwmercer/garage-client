import React from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VehiclesList from '../vehicles-list/vehicles-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { VehicleCard } from '../vehicle-card/vehicle-card';
import { VehicleView } from '../vehicle-view/vehicle-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            // Setting vehicles to an empty array
            vehicles: [],
            selectedVehicle: null,
            owner: null
        }
    }

    getVehicles(token) {
        axios.get('https://my-garage-application.herokuapp.com/vehicles', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    vehicles: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                owner: localStorage.getItem('owner')
            });
            this.getVehicles(accessToken);
        }
    }

    setSelectedVehicle(newSelectedVehicle) {
        this.setState({
            selectedVehicle: newSelectedVehicle
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            owner: authData.owner.Ownername
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('owner', authData.owner.Ownername);
        this.getVehicles(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('owner');
        this.setState({
            owner: null
        });
    }

    render() {
        // Destructuring the vehicle object with ES6
        const { vehicles, selectedVehicle, owner } = this.state;

        if (!owner) return <Row>
            <Col>
                <LoginView onLoggedIn={owner => this.onLoggedIn(owner)} />
            </Col>
        </Row>

        if (vehicles.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className='main-view justify-content-md-center'>
                    {/* <Routes>
                   
                        <Route exact path="/" element={() => {
                            return vehicles.map(v => (
                                <Col md={3} key={v._id}>
                                    <VehicleCard vehicle={v} />
                                </Col>
                            ))
                        }} />
                        <Route path="/vehicles/:vehicleId" element={({ match }) => {
                            return <Col md={8}>
                                <VehicleView vehicle={vehicles.find(v => v._id === match.params.vehicleId)} />
                            </Col>
                        }} />
                    </Routes> */}

                    <Routes>
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (vehicles.length === 0) return <div className="main-view" />;
                            return <VehiclesList vehicles={vehicles} />;
                        }} />
                    </Routes>


                    {selectedVehicle
                        ? (
                            <Col md={8}>
                                <VehicleView vehicle={selectedVehicle} onBackClick={newSelectedVehicle => { this.setSelectedVehicle(newSelectedVehicle); }} />
                            </Col>
                        )
                        : vehicles.map(vehicle => (
                            <Col md={3}>
                                <VehicleCard key={vehicle._id} vehicle={vehicle} onVehicleClick={(vehicle) => { this.setSelectedVehicle(vehicle) }} />
                            </Col>
                        ))
                    }
                </Row>
                <Row justify-content-md-center>
                    <button onClick={() => { this.onLoggedOut() }}>Logout</button>
                </Row>
            </Router >
        );
    }
}


export default MainView;