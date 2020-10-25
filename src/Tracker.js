import React from 'react';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/itemTracker'

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
        };
         //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
    }

    componentDidMount() {  
        //request and parse the locations and macros yaml file from the randomizer repositroy
        //This ensures that we always have up to date locations and logic
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Macros.yaml', (error, response, body) => {
            if (error || response.statusCode !== 200) return;
            const macros = yaml.safeLoad(body);
            console.log(macros);
            request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const doc = yaml.safeLoad(body);
                    console.log(doc)
                    const locations = [];
                    for (var location in doc) {
                        const splitName = location.split('-', 2);
                        let group = splitName[0].trim(); //group is the area the location belongs to (e.g. Skyloft, Faron, etc.)
                        //fix groups that have specific naming for randomizer reasons
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
                        let requirementsString = doc[location].Need;
                        let splitRequirements = requirementsString.split('&')
                        let finalRequirements = [];
                        splitRequirements.forEach(requirement => {
                            requirement = requirement.trim();
                            requirement = requirement.replaceAll('|', 'or').replaceAll('(', '').replaceAll(')', '')
                            console.log(requirement);
                            // console.log(macros[requirement])
                            if (macros[requirement] !== null) {
                                finalRequirements = finalRequirements.concat(this.parseMacro(requirement, macros));
                            } else {
                                finalRequirements.push(requirement);
                            }
                        });
                        console.log(finalRequirements);
                        let newLocation = {localId: -1, name: locationName, checked: false, needs: finalRequirements}
                        let id = locations[group].push(newLocation) - 1;
                        locations[group][id].localId = id;
                    }
                    this.setState({locations: locations})
                    const locationGroups = [];
                    for (var group in locations) {
                        locationGroups.push(group);
                    }
                    this.setState({locationGroups: locationGroups})
                }
            });
        });
    }

    parseMacro(macro, macros) {
        let finalValue = [];
        let parsed = macros[macro];
        console.log(parsed)
        if (parsed === undefined) return macro;
        if (parsed.includes('Progressive')) return macro;
        let splitParsed = parsed.split('&');
        splitParsed.forEach(requirement => {
            requirement = requirement.trim();
            requirement = requirement.replaceAll('|', 'or').replaceAll('(', '').replaceAll(')', '')
            if (macros[requirement] !== undefined) {
                finalValue = finalValue.concat(this.parseMacro(requirement, macros));
            } else {
                finalValue.push(requirement);
            }
        })
        return finalValue;
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
        newState[group][location].checked = !newState[group][location].checked;
        this.setState({locations: newState});
    }

    render() {
        return (
            <div>
                {/* <ItemTracker /> */}
                <LocationTracker
                    locationGroups={this.state.locationGroups}
                    locations={this.state.locations}
                    expandedGroup={this.state.expandedGroup}
                    handleGroupClick={this.handleGroupClick}
                    handleLocationClick={this.handleLocationClick}
            />
            </div>
        )
    }
}

export default Tracker;