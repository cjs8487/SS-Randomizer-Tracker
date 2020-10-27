import React from 'react';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/itemTracker'
import BasicCounters from './BasicCounters'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/cjs/Row";

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
class Tracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationGroups: [],
            locations: [],
            totalChecks: 0,
            totalChecksChecked: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
         //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        //updating window properties
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        const locations = [];
        //request and parse the locations yaml file from the randomizer repositroy. This ensures that we always have up to date locations and logic
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const doc = yaml.safeLoad(body);
                let counter = 0; // to count total number of checks
                for (var location in doc) {
                    const splitName = location.split('-', 2);
                    let group = splitName[0].trim(); //group is the area the location belongs to (e.g. Skyloft, Faron, etc.)
                    //fix groups htat have specific naming for randomizer reasons
                    if (group === 'Skyview Boss Room' || group === 'Skyview Spring') {
                        group = 'Skyview'
                    } else if (group === 'ET Boss Room' || group === 'ET Spring') {
                        group = 'Earth Temple';
                    } else if (group === 'LMF boss room') {
                        group = 'Lanayru Mining Facility';
                    } else if (group === 'AC Boss Room') {
                        group = 'Ancient Cistern';
                    } else if (group === 'Skyloft Silent Realm') {
                        group = 'Skyloft';
                    } else if (group === 'Faron Silent Realm') {
                        group = 'Faron Woods';
                    } else if (group === 'Eldin Silent Realm') {
                        group = 'Eldin Volcano';
                    } else if (group === 'Lanyru Silent Realm') {
                        group = 'Lanayru';
                    } else if (group === 'Skykeep') {
                        group = 'Sky Keep';
                    }
                    const locationName = splitName[1].trim();
                    if (locations[group] == null) {
                        locations[group] = [];
                    }
                    locations[group].push(locationName);
                    locations[group][locationName] = false;
                    ++counter;
                }
                this.setState({locations: locations})
                const locationGroups = [];
                for (var group in locations) {
                    locationGroups.push(group);
                }
                this.setState({locationGroups: locationGroups})
                this.setState({totalChecks: counter})
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
        let newTotalChecksChecked = this.state.totalChecksChecked;
        newState[group][location] ?  ++newTotalChecksChecked : --newTotalChecksChecked;
        this.setState({totalChecksChecked: newTotalChecksChecked});
    }

    render() {
        const itemTrackerStyle = {
            position: 'fixed',
            width: 12 * this.state.width / 30, //this is supposed to be *a bit* more than 1/3
            height: this.state.height,
            left: 0,
            top: 0,
            margin: "1%"
            // border: '3px solid #73AD21'
        }

        const  locationTrackerStyle = {
            position: 'fixed',
            width: this.state.width/3,
            left: itemTrackerStyle.width,
            top: 0,
            margin: "1%"
        }

        console.log(this.state.locations);

        return (
            <div>
                <Container>
                    <Row xs={1} sm={2} md={3}>
                        <Col xs={1}>
                            <ItemTracker style={itemTrackerStyle}/>
                        </Col>
                        <Col xs={1}>
                            <LocationTracker style={locationTrackerStyle}
                                locationGroups={this.state.locationGroups}
                                locations={this.state.locations}
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                handleLocationClick={this.handleLocationClick}
                            />
                            <BasicCounters
                                totalChecks = {this.state.totalChecks}
                                totalChecksChecked = {this.state.totalChecksChecked}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
}

export default Tracker;