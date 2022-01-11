import React from 'react';
import PropTypes from 'prop-types';

export class VehicleCard extends React.Component {
    render() {
        const { vehicle, onVehicleClick } = this.props;

        return <div className="vehicle-card" onClick={() => { onVehicleClick(vehicle); }}>{vehicle.Nickname}</div>;
    }
}

VehicleCard.propTypes = {
    // shape tells that it is an object
    vehicle: PropTypes.shape({
        Nickname: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Model: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Make: PropTypes.shape({
            BrandName: PropTypes.string.isRequired
        })
    }).isRequired,
    onVehicleClick: PropTypes.func.isRequired
};