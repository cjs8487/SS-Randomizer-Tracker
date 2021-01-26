import React from 'react';
import PropTypes from 'prop-types';
import LocationGroup from './LocationGroup';
import './locationTracker.css';
import ColorScheme from '../customization/colorScheme';
import Logic from '../logic/Logic';

class LocationTracker extends React.Component {
    render() {
        return (
            <div className="location-tracker">
                <ul style={{ padding: '2%' }}>
                    {
                        this.props.logic.areas().map((value) => (
                            <LocationGroup
                                key={value}
                                groupName={value}
                                locations={this.props.logic.locationsForArea(value)}
                                expanded={this.props.expandedGroup === value}
                                handler={this.props.handleGroupClick}
                                locationHandler={this.props.handleLocationClick}
                                remainingChecks={this.props.logic.getTotalCountForArea(value)}
                                inLogicChecks={this.props.logic.getInLogicCountForArea(value)}
                                meetsRequirement={this.props.logic.isRequirementMet}
                                colorScheme={this.props.colorScheme}
                            />
                        ))
                    }
                </ul>
            </div>
        );
    }
}
LocationTracker.propTypes = {
    style: PropTypes.object.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    expandedGroup: PropTypes.string.isRequired,
    handleGroupClick: PropTypes.func.isRequired,
    handleLocationClick: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
}
export default LocationTracker;
