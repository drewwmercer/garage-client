import React from 'react';
import axios from 'axios';

import { VehicleCard } from '../vehicle-card/vehicle-card';
import { VehicleView } from '../vehicle-view/vehicle-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            // Setting vehicles to an empty array
            vehicles: [],
            selectedVehicle: null
        }
    }

    componentDidMount() {
        axios.get('https://my-garage-application.herokuapp.com/vehicles')
            .then(response => {
                this.setState({
                    vehicles: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedVehicle(newSelectedVehicle) {
        this.setState({
            selectedVehicle: newSelectedVehicle
        });
    }

    render() {
        // Destructuring the vehicle object with ES6
        const { vehicles, selectedVehicle } = this.state;

        if (vehicles.length === 0) return <div className="main-view" />;

        return (
            <div className='main-view'>
                {selectedVehicle
                    ? <VehicleView vehicle={selectedVehicle} onBackClick={newSelectedVehicle => { this.setSelectedVehicle(newSelectedVehicle); }} />
                    : vehicles.map(vehicle => (
                        <VehicleCard key={vehicle._id} vehicle={vehicle} onVehicleClick={(vehicle) => { this.setSelectedVehicle(vehicle) }} />
                    ))
                }
            </div>
        );
    }
}


export default MainView;