import React from 'react';
import _ from 'lodash';
import Location from './Location'
import AreaCounters from './AreaCounters';

//props:
//groupName - the display name of this group
//locations - the list of locations this group contains
//expanded - whether or not this group is expanded (boolean)
//handler - the event handler for this component, owned by a component higher in the heirarchy for managing state
//locationHandler - the event handler for location clicks
//checksPerLocation - dictionary containing every location and it's respective total number of remaining checks
class LocationGroup extends React.Component {

    onClick() {
        this.props.handler(this.props.groupName);
        console.log(this.props.totalChecks);
    }

    render() {
        const filteredLocations = _.filter(this.props.locations, (location) => {
            console.log(location.nonprogress);
            return !location.nonprogress;
        });
        console.log(this.props.groupName)
        console.log(filteredLocations)
        return (
            <div className={"location-group-" + this.props.groupName}>
                <h3 onClick={() => this.onClick()} style={{ cursor: "pointer", color: this.props.colorScheme.text }}>
                    {this.props.groupName}
                    <AreaCounters totalChecksLeftInArea={this.props.remainingChecks} totalChecksAccessible={this.props.inLogicChecks} colorScheme={this.props.colorScheme} />
                </h3>
                {this.props.expanded &&
                    <ul style={{ padding: "5%" }}>
                        {_.map(filteredLocations, ((value, index) => {
                            let offset = Math.ceil(this.props.locations.length / 2);
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
                                    )
                                } else {
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
                                    )
                                }
                            } else {
                                return (<div key={index} />)
                            }
                        }))}
                    </ul>
                }
            </div>
        );
    }
}

export default LocationGroup;