import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class VehicleView extends React.Component {

    render() {
        const { vehicle, onBackClick } = this.props;

        return (
            <div className="vehicle-view">
                <div className="vehicle-image">
                    <img src={vehicle.ImagePath} />
                </div>
                <div className="vehicle-nickname">
                    <span className="label">Nickname: </span>
                    <span className="value">{vehicle.Nickname}</span>
                </div>
                <div className="vehicle-description">
                    <span className="label">Description: </span>
                    <span className="value">{vehicle.Year} {vehicle.Model}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back to Garage</button>
                <Link to={`/makes/${vehicle.Make.BrandName}`}>
                    <Button variant="link">Make</Button>
                </Link>

                <Link to={`/bodytypes/${vehicle.BodyType.BodyName}`}>
                    <Button variant="link">Type</Button>
                </Link>
            </div>
        );
    }
}

VehicleView.propTypes = {
    vehicle: PropTypes.shape({
        Nickname: PropTypes.string.isRequired,
        Description: PropTypes.string,
        Year: PropTypes.string.isRequired,
        Make: PropTypes.shape({
            BrandName: PropTypes.string.isRequired,
            About: PropTypes.string
        }).isRequired,
        ImagePath: PropTypes.string.isRequired,
        Active: PropTypes.bool,
        Model: PropTypes.string.isRequired,
        Trim: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};