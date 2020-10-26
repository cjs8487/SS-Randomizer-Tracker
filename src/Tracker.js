import React from 'react';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/itemTracker'
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
            items: ["Practice Sword", "Goddess Sword", "Emerald Tablet", "Ruby Tablet", "Amber Tablet"],
        };
         //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.parseMacro = this.parseMacro.bind(this);
        this.checkAllRequirements = this.checkAllRequirements.bind(this);
        this.meetsRequirements = this.meetsRequirements.bind(this);
        this.meetsRequirement = this.meetsRequirement.bind(this);
        this.updateLocationLogic = this.updateLocationLogic.bind(this);
    }

    componentDidMount() {  
        //request and parse the locations and macros yaml file from the randomizer repositroy
        //This ensures that we always have up to date locations and logic
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Macros.yaml', (error, response, body) => {
            if (error || response.statusCode !== 200) return;
            const macros = yaml.safeLoad(body);
            request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const doc = yaml.safeLoad(body);
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
                        let finalRequirements = [];
                        let matchedRequirements = [];
                        if (requirementsString.match(/[(][(].*&.*[)]/g)) {
                            let matches = [...requirementsString.matchAll(/[(][(].*&.*[)]/g)]
                            let finalMatches = [];
                            matches.forEach((match, index) => {
                                if (finalMatches[index] === undefined) {
                                    finalMatches[index] = "";
                                }
                                let splits = match[0].split(/[&|]/);
                                let symbols = match[0].split(/[^&|]*/)
                                splits.forEach((split, splitIndex) => {
                                    finalMatches[index] += symbols[splitIndex];
                                    let newSplit = split.trim().slice(0);
                                    newSplit = newSplit.replaceAll('(', '').replaceAll(')', '')
                                    if (macros[newSplit] !== undefined) {
                                        finalMatches[index] += " " + this.parseMacro(newSplit, macros) + split.replaceAll(newSplit, '').trim()
                                    } else {
                                        finalMatches[index] += split;
                                    }
                                });
                                finalMatches[index] = finalMatches[index].replaceAll('|', "or").replaceAll('&', "and")
                            });
                            matchedRequirements.push(finalMatches)
                            requirementsString = requirementsString.replaceAll(/[(][(].*&.*[)]/g, '');
                            // console.log("new requirements: " + requirementsString);
                        }
                        let splitRequirements = requirementsString.split('&')
                        splitRequirements.forEach(requirement => {
                            requirement = requirement.trim();
                            requirement = requirement.replaceAll('|', 'or').replaceAll('(', '').replaceAll(')', '')
                            if (requirement === "") {
                                if (matchedRequirements.length > 0) {
                                    finalRequirements.push(matchedRequirements)
                                }
                            } else {
                                if (macros[requirement] !== undefined) {
                                    finalRequirements = finalRequirements.concat(this.parseMacro(requirement, macros));
                                } else {
                                    finalRequirements.push(requirement);
                                }
                            }
                        });
                        if (finalRequirements[0] === "Nothing" && finalRequirements.length > 1) {
                            finalRequirements.shift();
                        }
                        let newLocation = {
                            localId: -1,
                            name: locationName,
                            checked: false,
                            needs: finalRequirements,
                            inLogic: this.meetsRequirements(finalRequirements)
                        }
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
        const regex = /[(][(].*&.*[)]/g
        let finalValue = [];
        let parsed = macros[macro];
        if (parsed === undefined) return macro;
        if (parsed.includes('Progressive')) return macro;
        let matchedRequirements = [];
        if (parsed.match(regex)) {
            let matches = [...parsed.matchAll(regex)]
            let finalMatches = [];
            matches.forEach((match, index) => {
                if (finalMatches[index] === undefined) {
                    finalMatches[index] = "";
                }
                let splits = match[0].split(/[&|]/);
                let symbols = match[0].split(/[^&|]*/)
                splits.forEach((split, splitIndex) => {
                    console.log(split)
                    finalMatches[index] += symbols[splitIndex];
                    let newSplit = split.trim().slice(0);
                    newSplit = newSplit.replaceAll('(', '').replaceAll(')', '')
                    if (macros[newSplit] !== undefined) {
                        finalMatches[index] += " " + this.parseMacro(newSplit, macros) + split.replaceAll(newSplit, '').trim()
                    } else {
                        finalMatches[index] += split;
                    }
                });
                finalMatches[index] = finalMatches[index].replaceAll('|', "or").replaceAll('&', "and")
            });
            matchedRequirements.push(finalMatches);
            parsed = parsed.replaceAll(regex, '')
        }
        let splitParsed = parsed.split('&');
        splitParsed.forEach(requirement => {
            requirement = requirement.trim();
            requirement = requirement.replaceAll('|', 'or').replaceAll('(', '').replaceAll(')', '')
            if (requirement === "") {
                if (matchedRequirements.length > 0) {
                    finalValue.push(matchedRequirements)
                }
            } else {
                if (macros[requirement] !== undefined) {
                    finalValue = finalValue.concat(this.parseMacro(requirement, macros));
                } else {
                    finalValue.push(requirement);
                }
            }
        });
        return finalValue;
    }

    checkAllRequirements() {
        for (let group in this.state.locations) {
            this.state.locations[group].forEach(location => {
                let inLogic = this.meetsRequirements(location.needs);
                location.inLogic = inLogic;
            });
        }
    }

    //checks if an entire list of requirements are met for a check
    meetsRequirements(requirements) {
        let met = true;
        requirements.forEach(requirement => {
            if (!this.meetsRequirement(requirement)) {
                met = false;
            }
        });
        return met;
    }

    //checks an individual requirement for a check
    meetsRequirement(requirement) {
        if (requirement === "Nothing") { //special case for free items
            return true;
        }
        //handle or requirements
        if (requirement.includes(" or ")) {
            let met = false;
            let items = requirement.split(" or ");
            items.forEach(item => {
                if (this.state.items.includes(item)) {
                    met = true;
                }
            });
            return met;
        } else { //otherwise just look for the individual item in the requirement
            return this.state.items.includes(requirement);
        }
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

    updateLocationLogic(item, value) {
        console.log("updating logic with " + item + " and value " + value);
        let newState = this.state.items.slice();
        switch (item) {
            case "beetle":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Beetle"), 1);
                        newState.splice(newState.indexOf("Hook Beetle"), 1);
                        break;
                    case 1:
                        newState.push("Beetle");
                        break;
                    case 2:
                        newState.push("Hook Beetle");
                        break;
                    default:
                        break;
                }
                break;
            case "slingshot":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Slingshot"), 1);
                        break;
                    case 1:
                        newState.push("Slingshot");
                        break;
                    default:
                        break;
                }
                break;
            case "bombs":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Bomb Bag"), 1);
                        break;
                    case 1:
                        newState.push("Bomb Bag");
                        break;
                    default:
                        break;
                }
                break;
            case "gustBellows":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Gust Bellows"), 1);
                        break;
                    case 1:
                        newState.push("Gust Bellows");
                        break;
                    default:
                        break;
                }
                break;
            case "whip":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Whip"), 1);
                        break;
                    case 1:
                        newState.push("Whip");
                        break;
                    default:
                        break;
                }
                break;
            case "clawshots":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Clawshots"), 1);
                        break;
                    case 1:
                        newState.push("Clawshots");
                        break;
                    default:
                        break;
                }
                break;
            case "bow":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Bow"), 1);
                        break;
                    case 1:
                        newState.push("Bow");
                        break;
                    default:
                        break;
                }
                break;
            case "bugnet":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Bug Net"), 1);
                        break;
                    case 1:
                        newState.push("Bug Net");
                        break;
                    default:
                        break;
                }
                break;    
            default:
                break;
        }
        this.setState({items: newState});
    }

    render() {
        // console.log(this.state.items);
        this.checkAllRequirements();
        return (
            <div>
                <Container>
                    <Row xs={1} sm={2} md={3}>
                        <Col xs={1}>
                            <ItemTracker updateLogic={this.updateLocationLogic} />
                        </Col>
                        <Col xs={1}>
                            <LocationTracker
                                locationGroups={this.state.locationGroups}
                                locations={this.state.locations}
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                handleLocationClick={this.handleLocationClick}
                                meetsRequirement={this.meetsRequirement}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Tracker;