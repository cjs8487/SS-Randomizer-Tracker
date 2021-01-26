import React from 'react';
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
        return (
            <div className={`location-group-${this.props.groupName}`}>
                <div className="group-container" onClick={this.onClick} onKeyDown={this.onClick} role="button" tabIndex="0">
                    <h3 style={{ cursor: 'pointer', color: this.props.colorScheme.text }}>
                        {this.props.groupName}
                        <AreaCounters totalChecksLeftInArea={this.props.remainingChecks} totalChecksAccessible={this.props.inLogicChecks} colorScheme={this.props.colorScheme} />
                    </h3>
                </div>

                {
                    this.props.expanded && (
                        <ul style={{ padding: '5%' }}>
                            {
                                this.props.locations.map((value, index) => {
                                    const offset = Math.ceil(this.props.locations.length / 2);
                                    if (index < offset) {
                                        if (index + offset < this.props.locations.length) {
                                            return (
                                                <div className="row" key={value}>
                                                    <div className="column">
                                                        <Location
                                                            location={value}
                                                            group={this.props.groupName}
                                                            handler={this.props.locationHandler}
                                                            meetsRequirement={this.props.meetsRequirement}
                                                            colorScheme={this.props.colorScheme}
                                                        />
                                                    </div>
                                                    <div className="column" key={this.props.locations[index + offset]}>
                                                        <Location
                                                            location={this.props.locations[index + offset]}
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
                                            <div className="row" key={this.props.locations[index + offset]}>
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
                                })
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
