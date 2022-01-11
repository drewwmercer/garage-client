import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { VehicleCard } from '../vehicle-card/vehicle-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

function VehiclesList(props) {
    const { vehicles, visibilityFilter } = props;
    let filteredVehicles = vehicles;

    if (visibilityFilter !== '') {
        filteredVehicles = vehicles.filter(v => v.Nickname.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }
    if (!vehicles) return <div className="main-view" />;

    return <>
        <Col md={12} style={{ margin: '2em' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredVehicles.map(v => (
            <Col md={4} key={v._id}>
                <VehicleCard vehicle={v} />
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(VehiclesList);