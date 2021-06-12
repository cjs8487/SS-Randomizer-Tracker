import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Location from './Location';
import AreaCounters from './AreaCounters';
import ItemLocation from '../logic/ItemLocation';
import ColorScheme from '../customization/ColorScheme';

// props:
// groupName - the display name of this group
// locations - the list of locations this group contains
// expanded - whether or not this group is expanded (boolean)
// handler - the event handler for this component, owned by a component higher in the heirarchy for managing state
// locationHandler - the event handler for location clicks
// checksPerLocation - dictionary containing every location and it's respective total number of remaining checks
class LocationGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.handler(this.props.groupName);
    }

    render() {
        const filteredLocations = _.filter(this.props.locations, (location) => !location.nonprogress);
        return (
            <div className={`location-group-${this.props.groupName}`}>
                <div onClick={this.onClick} role="button" onKeyDown={this.onClick} tabIndex="0">
                    <h3 style={{ cursor: 'pointer', color: this.props.colorScheme.text }}>
                        {this.props.groupName}
                        <AreaCounters totalChecksLeftInArea={this.props.remainingChecks} totalChecksAccessible={this.props.inLogicChecks} colorScheme={this.props.colorScheme} />
                    </h3>
                </div>
                {
                    this.props.expanded && (
                        <ul style={{ padding: '5%' }}>
                            {
                                _.map(filteredLocations, ((value, index) => {
                                    const offset = Math.ceil(this.props.locations.length / 2);
                                    if (index < offset) {
                                        if (index + offset < filteredLocations.length) {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="column">
                                                        <Location
                                                            location={value}
                                                            group={this.props.groupName}
                                                            handler={this.props.locationHandler}
                                                            meetsRequirement={this.props.meetsRequirement}
                                                            colorScheme={this.props.colorScheme}
                                                        />
                                                    </div>
                                                    <div className="column" key={index + offset}>
                                                        <Location
                                                            location={filteredLocations[index + offset]}
                                                            group={this.props.groupName}
                                                            handler={this.props.locationHandler}
                                                            meetsRequirement={this.props.meetsRequirement}
                                                            colorScheme={this.props.colorScheme}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div className="row" key={index}>
                                                <div className="column">
                                                    <Location
                                                        location={value}
                                                        group={this.props.groupName}
                                                        handler={this.props.locationHandler}
                                                        meetsRequirement={this.props.meetsRequirement}
                                                        colorScheme={this.props.colorScheme}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (<div key={value} />);
                                }))
                            }
                        </ul>
                    )
                }
            </div>
        );
    }
}

LocationGroup.propTypes = {
    expanded: PropTypes.bool.isRequired,
    groupName: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    locationHandler: PropTypes.func.isRequired,
    locations: PropTypes.arrayOf(PropTypes.instanceOf(ItemLocation)).isRequired,
    meetsRequirement: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    remainingChecks: PropTypes.number.isRequired,
    inLogicChecks: PropTypes.number.isRequired,
};
export default LocationGroup;
