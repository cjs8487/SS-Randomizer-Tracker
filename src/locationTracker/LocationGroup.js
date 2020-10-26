import React from 'react';
import Location from './Location'
import AreaCounters from './AreaCounters';

//props:
//groupName - the display name of this group
//locations - the list of locations this group contains
//expanded - whether or not this group is expanded (boolean)
//handler - the event handler for this component, owned by a component higher in the heirarchy for managing state
//locationHandler - the event handler for location clicks
class LocationGroup extends React.Component {

    onClick() {
        this.props.handler(this.props.groupName);
        console.log(this.props.totalChecks);
    }

    render() {
        if (this.props.expanded) {
            return (
                <div className={"location-group-" + this.props.groupName}>
                    <h3 onClick={() => this.onClick()} style={{cursor: "pointer"}}>
                        {this.props.groupName} 
                        <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation[this.props.groupName]}/>
                    </h3>
                    <ul>
                        {this.props.locations.map((value, index) => {
                            return (
                                <Location
                                    key={index}
                                    name={value}
                                    group={this.props.groupName}
                                    checked={this.props.locations[value]}
                                    handler={this.props.locationHandler}
                                />
                            )
                        })}
                    </ul>
                </div>
            );
        } else return (
            <div className={"location-group-" + this.props.groupName}>
                <h3 onClick={() => this.onClick()} style={{cursor: "pointer"}}>
                    {this.props.groupName} 
                    <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation[this.props.groupName]}/>
                </h3>   
            </div>
        )
    }
}

export default LocationGroup;