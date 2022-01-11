import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class VehicleCard extends React.Component {
    render() {
        const { vehicle, onVehicleClick } = this.props;

        // return <div className="vehicle-card" onClick={() => { onVehicleClick(vehicle); }}>{vehicle.Nickname}</div>;
        return (
            <Card>
                <Card.Img variant="top" src={vehicle.ImagePath} />
                <Card.Body>
                    <Card.Title>{vehicle.Nickname}</Card.Title>
                    <Card.Text>{vehicle.Make}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
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