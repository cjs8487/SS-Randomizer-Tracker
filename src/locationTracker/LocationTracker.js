import React from 'react';
import LocationGroup from './LocationGroup';
import './locationTracker.css';

class LocationTracker extends React.Component {
    render() {
        return (
            <div className="location-tracker" style={this.props.style}>
                <ul style={{ padding: '2%' }}>
                    {this.props.locationGroups.map((value, index) => (
                        <LocationGroup
                            key={index}
                            groupName={value}
                            locations={this.props.locations[value]}
                            expanded={this.props.expandedGroup === value}
                            handler={this.props.handleGroupClick}
                            locationHandler={this.props.handleLocationClick}
                            checksPerLocation={this.props.checksPerLocation}
                            accessiblePerLocation={this.props.accessiblePerLocation}
                            meetsRequirement={this.props.meetsRequirement}
                            colorScheme={this.props.colorScheme}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default LocationTracker;
