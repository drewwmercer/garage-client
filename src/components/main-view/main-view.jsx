import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    render() {
        // Destructuring the vehicle object with ES6
        const { vehicles, selectedVehicle, owner } = this.state;

        if (!owner) return <LoginView onLoggedIn={owner => this.onLoggedIn(owner)} />;

        if (vehicles.length === 0) return <div className="main-view" />;

        return (
            <Row className='main-view justify-content-md-center'>
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
        );
    }
}


export default MainView;