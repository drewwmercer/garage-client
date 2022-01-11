import React from 'react';
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