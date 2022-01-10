import React from 'react';

export class VehicleCard extends React.Component {
    render() {
        const { vehicle } = this.props;
        return <div className="vehicle-card">{vehicle.Nickname}</div>;
    }
}