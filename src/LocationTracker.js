import React from 'react';
import Location from './Location';

const request = require('request');
const yaml = require('js-yaml');

class LocationTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        };
        const locations = [];
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const doc = yaml.safeLoad(body);
                console.log(doc);
                for (var location in doc) {
                    locations.push(location);
                }
                this.setState({locations: locations})
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="location-tracker">
                <ul>
                    {this.state.locations.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default LocationTracker;