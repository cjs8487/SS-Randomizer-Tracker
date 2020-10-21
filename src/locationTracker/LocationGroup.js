import React from 'react';
import Location from './Location'

class LocationGroup extends React.Component {

    onClick() {
        this.props.handler(this.props.groupName);
    }

    render() {
        if (this.props.expanded) {
            return (
                <div className={"location-group-" + this.props.groupName}>
                    <h3 onClick={() => this.onClick()}>{this.props.groupName}</h3>
                    <ul>
                        {this.props.locations.map((value, index) => {
                            return <Location key={index} name={value} group={this.props.groupName} checked={this.props.locations[value]} handler={this.props.locationHandler}/>
                        })}
                    </ul>
                </div>
            );
        } else return (
            <div className={"location-group-" + this.props.groupName}>
                <h3 onClick={() => this.onClick()}>{this.props.groupName}</h3>
            </div>
        )
    }
}

export default LocationGroup;