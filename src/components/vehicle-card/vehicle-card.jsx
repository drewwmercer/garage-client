import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class VehicleCard extends React.Component {
    render() {
        const { vehicle } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={vehicle.ImagePath} />
                <Card.Body>
                    <Card.Title>{vehicle.Nickname}</Card.Title>
                    <Card.Text>{vehicle.Make.BrandName}</Card.Text>

                    <Link to={`/vehicles/${vehicle.Nickname}`}>
                        <Button variant="link">View</Button>
                    </Link>
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
    }).isRequired
};