import React from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";

import VehiclesList from '../vehicles-list/vehicles-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { VehicleCard } from '../vehicle-card/vehicle-card';
import { VehicleView } from '../vehicle-view/vehicle-view';
import { Navigation } from '../navbar/navbar';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            // Setting some vehicles to an empty array
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

    // setSelectedVehicle(newSelectedVehicle) {
    //     this.setState({
    //         selectedVehicle: newSelectedVehicle
    //     });
    // }

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
        // const { vehicles, selectedVehicle, owner } = this.state;
        const { vehicles, owner } = this.state;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!owner) return (
                            <LoginView onLoggedIn={owner => this.onLoggedIn(owner)} />
                        );

                        if (vehicles.length === 0) return <div className="main-view" />;

                        return (
                            <div>
                                <Row>
                                    <Navbar />
                                </Row>
                                <Row>
                                    {vehicles.map(v => (
                                        <Col md={3} key={v._id} className="justify-content-center p-4">
                                            <VehicleCard vehicle={v} />
                                        </Col>
                                    ))}
                                </Row>
                                <Row className="justify-content-md-center">
                                    <button onClick={() => { this.onLoggedOut() }}>Logout</button>
                                </Row>
                            </div>
                        )
                    }} />

                    <Route exact path="/vehicles/:Nickname" render={({ match, history }) => {
                        if (!owner) return (
                            <LoginView onLoggedIn={owner => this.onLoggedIn(owner)} />
                        );

                        if (vehicles.length === 0) return <div className="main-view" />;

                        let vehicleByName = vehicles.find(vehicle => vehicle.Nickname === match.params.Nickname);
                        if (!vehicleByName) {
                            vehicleByName = {
                                Nickname: '',
                                Year: '',
                                Make: [],
                                BodyType: {},
                                ImagePath: '',
                                Active: true,
                                Model: '',
                                Trim: ''
                            }
                        }

                        return (
                            <Row>
                                <Col md={8} className="p-4">
                                    <VehicleView vehicle={vehicleByName} onBackClick={() => history.goBack()} />
                                </Col>
                            </Row>
                        );
                    }}
                    />
                </Row >
            </Router >
        );
    }
}

export default MainView;
