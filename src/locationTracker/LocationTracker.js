import React from 'react';
import LocationGroup from './LocationGroup';

const request = require('request');
const yaml = require('js-yaml');

//state structure
//locationGroups: array of strings containing the full list of location group names
//locations: array containing the full list of individual locations and their data with the following heirarchy
//  groups
//      locations
//          checked
//example:
//  Skyloft
//      Fledge
//          true
//      Practice Sword
//          false
//  Lanayru
//      Chest Near Party Wheel
//          false
class LocationTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationGroups: [],
            locations: [],
        };
        //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
    }

    componentDidMount() {
        const locations = [];
        //request and parse the locations yaml file from the randomizer repositroy. This ensures that we always have up to date locations and logic
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const doc = yaml.safeLoad(body);
                for (var location in doc) {
                    const splitName = location.split('-', 2);
                    const group = splitName[0]; //group is the area the location belongs to (e.g. Skyloft, Faron, etc.)
                    const locationName = splitName[1];
                    if (locations[group] == null) {
                        locations[group] = [];
                    }
                    locations[group].push(locationName);
                    locations[group][locationName] = false;
                }
                this.setState({locations: locations})
                const locationGroups = [];
                for (var group in locations) {
                    locationGroups.push(group);
                }
                this.setState({locationGroups: locationGroups})
            }
        }.bind(this)); //context correction for ansynchronous callback
    }

    handleGroupClick(group) {
        if (this.state.expandedGroup === group) {
            this.setState({expandedGroup: ''}); //deselection if the opened group is clicked again
        } else {
            this.setState({expandedGroup: group});
        }
    }

    handleLocationClick(group, location) {
        const newState = Object.assign({}, this.state.locations); //copy current state
        newState[group][location] = !newState[group][location];
        this.setState({locations: newState});
    }

    render() {
        console.log(this.state.locations);
        return (
            <div className="location-tracker">
                <ul>
                    {this.state.locationGroups.map((value, index) => {
                        return (
                        <LocationGroup
                            key={index}
                            groupName={value}
                            locations={this.state.locations[value]}
                            expanded={this.state.expandedGroup === value}
                            handler={this.handleGroupClick}
                            locationHandler={this.handleLocationClick}
                        />)
                    })}
                </ul>
            </div>
        );
    }
}

export default LocationTracker;