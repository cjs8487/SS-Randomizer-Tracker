import React from 'react';
import LocationGroup from './LocationGroup';
import './locationTracker.css';

class LocationTracker extends React.Component {

    render() {
        return (
            <div className="location-tracker" style={this.props.style}>
                <ul style={{padding: "2%"}}>
                    {this.props.logic.areas().map((value, index) => {    
                        return (
                        <LocationGroup
                            key={index}
                            groupName={value}
                            locations={this.props.logic.locationsForArea(value)}
                            expanded={this.props.expandedGroup === value}
                            handler={this.props.handleGroupClick}
                            locationHandler={this.props.handleLocationClick}
                            remainingChecks={this.props.logic.getTotalCountForArea(value)}
                            inLogicChecks={this.props.logic.getInLogicCountForArea(value)}
                            meetsRequirement={this.props.logic.isRequirementMet}
                            colorScheme={this.props.colorScheme}
                        />)
                    })}
                </ul>
            </div>
        );
    }
}

export default LocationTracker;