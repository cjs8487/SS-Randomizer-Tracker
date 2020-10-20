import React from 'react';
import LocationGroup from './LocationGroup';

const request = require('request');
const yaml = require('js-yaml');

class LocationTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        };
        this.handleGroupClick = this.handleGroupClick.bind(this);
    }

    componentDidMount() {
        const locations = [];
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const doc = yaml.safeLoad(body);
                for (var location in doc) {
                    const splitName = location.split('-', 2);
                    const group = splitName[0];
                    const locationName = splitName[1];
                    if (locations[group] == null) {
                        locations[group] = [];
                    }
                    locations[group].push(locationName);
                }
                this.setState({locations: locations})
            }
        }.bind(this));
    }

    handleGroupClick(group) {
        console.log("expanding " + group)
        this.setState({expandedGroup: group});
    }

    render() {
        console.log(this.state.locations);
        const locationGroups = [];
        for (var group in this.state.locations) {
            locationGroups.push(group);
        }
        return (
            <div className="location-tracker">
                <ul>
                    {locationGroups.map((value, index) => {
                        return <LocationGroup key={index} groupName={value} locations={this.state.locations[value]} expanded={this.state.expandedGroup === value} handler={this.handleGroupClick}/>
                    })}
                </ul>
            </div>
        );
    }
}

export default LocationTracker;