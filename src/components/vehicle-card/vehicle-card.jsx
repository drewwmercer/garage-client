import React from 'react';

export class VehicleCard extends React.Component {
    render() {
        const { vehicle, onVehicleClick } = this.props;
        return <div className="vehicle-card" onClick={() => { onVehicleClick(vehicle); }}>{vehicle.Nickname}</div>;
    }
}