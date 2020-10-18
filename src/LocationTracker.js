import React from 'react'
import Location from './Location'

class LocationTracker extends React.Component {

    render() {
        const locations = [];
        for (var i = 0; i < 2; i++) {
            locations.push(<Location name={"check " + i}/>)
        }
        return (
            <div className="location-tracker">
                {locations};
            </div>
        );
    }
}

export default LocationTracker;