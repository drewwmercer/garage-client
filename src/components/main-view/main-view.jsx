import React from 'react';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            vehicles: [

                {
                    _id: 1, Nickname: "Mary", Year: "1999-01-01", Model: "DB7", Trim: "N/A", BodyType: {
                        BodyName: "Coupe"
                    }
                },
                {
                    _id: 2, Nickname: "Anne", Year: "2000-01-01", Model: "F-350", Trim: "Custom", BodyType: {
                        BodyName: "Pickup Truck"
                    }
                }
            ]
        }
    }

    render() {
        const vehicles = this.state.vehicles;
        if (vehicles.length === 0) {
            return <div className="main-view">The vehicle list is empty.</div>;
        } else {
            return (
                <div className='main-view'>
                    <div>Mary</div>
                    <div>Barbara</div>
                    <div>Lindsey</div>
                    {vehicles.map((vehicle) => {
                        return <div key={vehicle._id}>{vehicle.Nickname}</div>;
                    })}
                </div>
            );
        }
    }
}

export default MainView;