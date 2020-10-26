import React from 'react';
import LocationGroup from './LocationGroup';
import './locationTracker.css';

class LocationTracker extends React.Component {

    render() {
        return (
            <div className="location-tracker">
                <ul>
                    {this.props.locationGroups.map((value, index) => {
                        return (
                        <LocationGroup
                            key={index}
                            groupName={value}
                            locations={this.props.locations[value]}
                            expanded={this.props.expandedGroup === value}
                            handler={this.props.handleGroupClick}
                            locationHandler={this.props.handleLocationClick}
                            meetsRequirement={this.props.meetsRequirement}
                        />)
                    })}
                </ul>
            </div>
        );
    }
}

export default LocationTracker;