import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import LocationGroup from './LocationGroup';
import AreaCounters from './AreaCounters';
import './locationTracker.css';
import ColorScheme from '../customization/ColorScheme';
import Logic from '../logic/Logic';

class LocationTracker extends React.Component {
    constructor(props) {
        super(props);
        _.forEach(this.props.logic.areas(), (area) => {
            this[_.camelCase(`open${area}`)] = this.openLocation.bind(this, area);
        });
    }

    openLocation(location) {
        this.props.handleGroupClick(location);
    }

    render() {
        return (
            <div className="location-tracker">
                <div>
                    <ul style={{ padding: '2%' }}>
                        {
                            this.props.logic.areas().map((value) => (
                                <div className="group-container" onClick={this[_.camelCase(`open${value}`)]} onKeyDown={this.onClick} role="button" tabIndex="0">
                                    <h3 style={{ cursor: 'pointer', color: this.props.colorScheme.text }}>
                                        {value}
                                        <AreaCounters
                                            totalChecksLeftInArea={this.props.logic.getTotalCountForArea(value)}
                                            totalChecksAccessible={this.props.logic.getInLogicCountForArea(value)}
                                            colorScheme={this.props.colorScheme}
                                        />
                                    </h3>
                                </div>
                            ))
                        }
                    </ul>
                </div>
                {
                    this.props.expandedGroup && (
                        <div>
                            <LocationGroup
                                groupName={this.props.expandedGroup}
                                locations={this.props.logic.locationsForArea(this.props.expandedGroup)}
                                expanded
                                handler={this.props.handleGroupClick}
                                locationHandler={this.props.handleLocationClick}
                                remainingChecks={this.props.logic.getTotalCountForArea(this.props.expandedGroup)}
                                inLogicChecks={this.props.logic.getInLogicCountForArea(this.props.expandedGroup)}
                                meetsRequirement={this.props.logic.isRequirementMet}
                                colorScheme={this.props.colorScheme}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}
LocationTracker.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    expandedGroup: PropTypes.string,
    handleGroupClick: PropTypes.func.isRequired,
    handleLocationClick: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};
LocationTracker.defaultProps = {
    expandedGroup: '',
};
export default LocationTracker;
