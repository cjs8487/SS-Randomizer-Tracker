import React from 'react';
import Location from './Location'

//props:
//groupName - the display name of this group
//locations - the list of locations this group contains
//expanded - whether or not this group is expanded (boolean)
//handler - the event handler for this component, owned by a component higher in the heirarchy for managing state
//locationHandler - the event handler for location clicks
class LocationGroup extends React.Component {

    onClick() {
        this.props.handler(this.props.groupName);
    }

    render() {
        if (this.props.expanded) {
            return (
                <div className={"location-group-" + this.props.groupName}>
                    <h3 onClick={() => this.onClick()} style={{cursor: "pointer"}}>{this.props.groupName}</h3>
                    <div>
                        {this.props.locations.map((value, index) => {
                            let offset = this.props.locations.length / 2;
                            if (index >= offset) return;
                            return (
                                <div className="row" key={index}>
                                    <div className="column">
                                <Location
                                    name={value}
                                    group={this.props.groupName}
                                    checked={this.props.locations[value]}
                                    handler={this.props.locationHandler}
                                />
                                </div>
                                <div className="column" key={index+offset}>
                                <Location
                                    name={this.props.locations[index + offset]}
                                    group={this.props.groupName}
                                    checked={this.props.locations[this.props.locations[index + offset]]}
                                    handler={this.props.locationHandler}
                                />
                                </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        } else return (
            <div className={"location-group-" + this.props.groupName}>
                <h3 onClick={() => this.onClick()} style={{cursor: "pointer"}}>{this.props.groupName}</h3>
            </div>
        )
    }
}

export default LocationGroup;