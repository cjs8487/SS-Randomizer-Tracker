import React from 'react';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/itemTracker'
import BasicCounters from './BasicCounters'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/cjs/Row";
import ImportExport from "./import-export";
import DungeonTracker from './itemTracker/dungeonTracker';
import CubeTracker from './locationTracker/cubeTracker';
import {SketchPicker} from 'react-color'

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
        const path = new URLSearchParams(this.props.location.search);
        const json = JSON.parse(path.get("options"))
        let startingItems = []
        let emerald = 0;
        let ruby = 0;
        let amber = 0;
        let sword = 0;
        let sailcloth = 0;
        startingItems.push("Sailcloth");
        sailcloth = 1;
        if (json.startingTablets === 3) {
            startingItems.push("Emerald Tablet");
            startingItems.push("Ruby Tablet");
            startingItems.push("Amber Tablet");
            emerald = 1;
            ruby = 1;
            amber = 1;
        }
        if (!json.swordless) {
            startingItems.push("Practice Sword");
            startingItems.push("Goddess Sword");
            sword = 2;
        }
        this.state = {
            options: json,
            locationGroups: [],
            locations: [],
            goddessCubes: [],
            items: startingItems,
            obtainedCubes: [],
            totalChecks: 0,
            totalChecksChecked: 0,
            checksPerLocation: {},
            accessiblePerLocation: {},
            width: window.innerWidth,
            height: window.innerHeight,
            itemClicked: false,
            trackerItems: {
                sword: sword,
                mitts: 0,
                scale: 0,
                earrings: 0,
                harp: 0,
                courage: 0,
                wisdom: 0,
                power: 0,
                ballad: 0,
                soth: 0,
                sailcloth: sailcloth,
                stone: 0,
                emeraldTablet: emerald,
                rubyTablet: ruby,
                amberTablet: amber,
                letter: 0,
                cBeetle: 0,
                rattle: 0,
                crystals: 0,
                slingshot: 0,
                beetle: 0,
                bombs: 0,
                gustBellows: 0,
                whip: 0,
                clawshots: 0,
                bow: 0,
                bugnet: 0,
                seaChart: 0,
                cavesKey: 0,
                bottle: 0,
                pouch: 0,
                spiralCharge: 0,
                stName: 0,
                etName: 0,
                lmfName: 0,
                acName: 0,
                sshName: 0,
                fsName: 0,
                skName: 0,
                stBossKey: 0,
                etBossKey: 0,
                lmfBossKey: 0,
                acBossKey: 0,
                sshBossKey: 0,
                fsBossKey: 0,
                triforce: 0,
                stSmall: 0,
                stSmall_1: 0,
                stSmall_2: 0,
                etEntry: 0,
                lmfSmall: 0,
                acSmall: 0,
                acSmall_1: 0,
                acSmall_2: 0,
                sshSmall: 0,
                sshSmall_1: 0,
                sshSmall_2: 0,
                fsSmall: 0,
                fsSmall_1: 0,
                fsSmall_2: 0,
                fsSmall_3: 0,
                skSmall: 0,
            },
            max: {
                sword: 6,
                mitts: 2,
                scale: 1,
                earrings: 1,
                harp: 1,
                courage: 1,
                wisdom: 1,
                power: 1,
                ballad: 1,
                soth: 3,
                sailcloth: 1,
                stone: 1,
                emeraldTablet: 1,
                rubyTablet: 1,
                amberTablet: 1,
                letter: 1,
                cBeetle: 1,
                rattle: 1,
                crystals: 16,
                slingshot: 1,
                beetle: 2,
                bombs: 1,
                gustBellows: 1,
                whip: 1,
                clawshots: 1,
                bow: 1,
                bugnet: 1,
                seaChart: 1,
                cavesKey: 1,
                bottle: 5,
                pouch: 1,
                spiralCharge: 1,
                stName: 1,
                etName: 1,
                lmfName: 1,
                acName: 1,
                sshName: 1,
                fsName: 1,
                skName: 1,
                stBossKey: 1,
                etBossKey: 1,
                lmfBossKey: 1,
                acBossKey: 1,
                sshBossKey: 1,
                fsBossKey: 1,
                triforce: 3,
                stSmall: 2,
                stSmall_1: 0,
                stSmall_2: 0,
                etEntry: 5,
                lmfSmall: 1,
                acSmall: 2,
                acSmall_1: 0,
                acSmall_2: 0,
                sshSmall: 2,
                sshSmall_1: 0,
                sshSmall_2: 0,
                fsSmall: 3,
                fsSmall_1: 0,
                fsSmall_2: 0,
                fsSmall_3: 0,
                skSmall: 1,
            },
            background: '#fff'
        };
        //this.setState({options: json})
        console.log(this.state.options);
         //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCubeClick = this.handleCubeClick.bind(this);
        this.parseLogicExpression = this.parseLogicExpression.bind(this);
        this.parseFullLogicExpression = this.parseFullLogicExpression.bind(this);
        this.parseLogicExpressionToString = this.parseLogicExpressionToString.bind(this);
        this.isLogicSymbol = this.isLogicSymbol.bind(this);
        this.isMacro = this.isMacro.bind(this);
        this.parseMacro = this.parseMacro.bind(this);
        this.checkAllRequirements = this.checkAllRequirements.bind(this);
        this.meetsRequirements = this.meetsRequirements.bind(this);
        this.meetsRequirement = this.meetsRequirement.bind(this);
        this.getLogicalState = this.getLogicalState.bind(this)
        this.meetsCompoundRequirement = this.meetsCompoundRequirement.bind(this);
        this.updateLocationLogic = this.updateLocationLogic.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.importState = this.importState.bind(this);
    }
    
    render() {
        console.log("Rendered");
        console.log(this.state.goddessCubes)
        this.checkAllRequirements();
        if(this.state.itemClicked){
            console.log("Item clicked true");
            this.itemClickedCounterUpdate();
        }
        const itemTrackerStyle = {
            position: 'fixed',
            width: 12 * this.state.width / 30, //this is supposed to be *a bit* more than 1/3
            height: this.state.height,
            left: 0,
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }
        
        const  locationTrackerStyle = {
            // position: 'absolute',
            // width: this.state.width/3,
            // left: itemTrackerStyle.width,
            // top: 0,
            // margin: "1%",
            // overflowY: "scroll",
            // overflow: "hidden"
        }
        
        const countersStyle = {
            // position: 'absolute',
            // width: this.state.width/3,
            // left: locationTrackerStyle.left + locationTrackerStyle.width,
            // top: 0,
            // margin: "1%"
        }
        
        // console.log(this.state.locations);

        const dungeonTrackerStyle = {
            width: 2 * this.state.width/3,
        }
        
        return (
            <div>
                <Container fluid style={{background: this.state.background}}>
                    <Row>
                        <Col>
                            <Row style={{paddingLeft: "3%"}}>
                                    <ItemTracker updateLogic={this.updateLocationLogic} styleProps={itemTrackerStyle}
                                                items={this.state.trackerItems}
                                                checksPerLocation={this.state.checksPerLocation}
                                                accessiblePerLocation={this.state.accessiblePerLocation}
                                                handleItemClick={this.handleItemClick}
                                    />
                            </Row>
                            <Row style={{paddingLeft: "3%", paddingTop: "4%"}}>
                                <Col>
                                    <Row>
                                        <Col>
                                            <h4>Background Color<br/></h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <SketchPicker
                                                color={this.state.background}
                                                onChangeComplete={(color) => this.setState({background: color.hex})} 
                                                disableAlpha={true}
                                                presetColors={[
                                                    "#FFFFFF",
                                                    "#00FFFF",
                                                    "#FF00FF",
                                                    "#FFFF00",
                                                    "#FF0000",
                                                    "#00FF00",
                                                    "#0000FF"
                                                ]}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{overflowY: "scroll", overflowX: "auto"}}>
                            <LocationTracker className="overflowAuto" style={locationTrackerStyle}
                                            items={this.state.trackerItems}
                                             locationGroups={this.state.locationGroups}
                                             locations={this.state.locations}
                                             expandedGroup={this.state.expandedGroup}
                                             handleGroupClick={this.handleGroupClick}
                                             handleLocationClick={this.handleLocationClick}
                                             meetsRequirement={this.meetsRequirement}
                                             checksPerLocation={this.state.checksPerLocation}
                                             accessiblePerLocation={this.state.accessiblePerLocation}
                            />
                        </Col>
                        <Col>
                            <Row>
                                <BasicCounters style={countersStyle}
                                            totalChecks = {this.state.totalChecks}
                                            totalChecksChecked = {this.state.totalChecksChecked}
                                            accessiblePerLocation={this.state.accessiblePerLocation}
                                            locationGroups={this.state.locationGroups}
                                />
                            </Row>
                            <Row style={{paddingRight: "10%"}}>
                                <div id={'dungeonTracker'}>
                                    <DungeonTracker styleProps={dungeonTrackerStyle} updateLogic={this.updateLogic} handleItemClick={this.handleItemClick}
                                        items={this.state.trackerItems}
                                        checksPerLocation={this.state.checksPerLocation} 
                                        accessiblePerLocation={this.state.accessiblePerLocation}
                                        skykeep={!this.state.options.skipSkykeep}
                                    />
                                </div>
                            </Row>
                            <Row style={{paddingRight: "10%", paddingTop: "5%"}}>
                                <CubeTracker
                                    locations={this.state.goddessCubes}
                                    meetsRequirement={this.meetsRequirement}
                                    locationHandler={this.handleCubeClick}
                                />
                            </Row>
                            <Row style={{padding: "5%"}}>
                                <ImportExport state={this.state} importFunction={this.importState}/>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    componentDidMount() {
        //updating window properties
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);  
        //request and parse the locations and macros yaml file from the randomizer repositroy
        //This ensures that we always have up to date locations and logic
        request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Macros.yaml', (error, response, body) => {
            if (error || response.statusCode !== 200) return;
            const macros = yaml.safeLoad(body);
            let parsedMacros = {};
            for (let macro in macros) {
                parsedMacros[macro] = this.parseLogicExpression(macros[macro])
            }
            //no entrance randomizer, sub default macros in
            parsedMacros["Can Access Skyview"] = parsedMacros["Can Access Dungeon Entrance In Deep Woods"];
            parsedMacros["Can Access Earth Temple"] = parsedMacros["Can Access Dungeon Entrance In Eldin Volcano"];
            parsedMacros["Can Access Lanayru Mining Facility"] = parsedMacros["Can Access Dungeon Entrance In Lanayru Desert"];
            parsedMacros["Can Access Ancient Cistern"] = parsedMacros["Can Access Dungeon Entrance In Lake Floria"];
            parsedMacros["Can Access Sandship"] = parsedMacros["Can Access Dungeon Entrance In Sand Sea"];
            parsedMacros["Can Access Fire Sanctuary"] = parsedMacros["Can Access Dungeon Entrance In Volcano Summit"];
            parsedMacros["Can Access Skykeep"] = parsedMacros["Can Access Dungeon Entrance On Skyloft"];

            this.setState({macros: parsedMacros})
            request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const doc = yaml.safeLoad(body);
                    console.log(doc)
                    const locations = {};
                    let counter = 0;
                    let checksPerLocation = {};
                    let accessiblePerLocation = {};
                    let goddessCubes = [];
                    for (var location in doc) {
                        const types = doc[location].type.split(",")
                        if (types.some(type => this.state.options.bannedLocations.includes(type.trim()))) {
                            continue;
                        }
                        const splitName = location.split('-');
                        let group = splitName[0].trim(); //group is the area the location belongs to (e.g. Skyloft, Faron, etc.)
                        if (group === 'Skykeep' && this.state.options.skipSkykeep) {
                            continue;
                        }
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
                        } else if (group === 'Lanayru Silent Realm') {
                            group = 'Lanayru';
                        } else if (group === 'Skykeep') {
                            group = 'Sky Keep';
                        }
                        const locationName = splitName.splice(1).join('-').trim();
                        if (locations[group] == null) {
                            locations[group] = [];
                        }
                        // if (goddessCubes[group] == null) {
                        //     goddessCubes[group] = [];
                        // }
                        if (checksPerLocation[group]== null) { //creates new entries in dictionary if location wasn't present before
                            checksPerLocation[group] = 0;
                        }
                        if (accessiblePerLocation[group]== null) {
                            accessiblePerLocation[group] = 0;
                        }

                        if (location.includes("Goddess Chest")) {
                            let reqs = doc[location].Need.split(' & ')
                            let cubeReq = reqs.filter(req => req.includes("Goddess Cube"))[0].trim()
                            let cube = {
                                localId: -1,
                                name: cubeReq.trim(),
                                logicExpression: this.state.macros[cubeReq],
                                needs: this.cleanUpLogicalString(
                                    this.parseLogicExpressionToString(this.parseFullLogicExpression(this.state.macros[cubeReq]), 0)
                                ),
                                inLogic: this.meetsRequirements(this.state.macros[cubeReq])
                            }
                            let id = goddessCubes.push(cube) - 1;
                            goddessCubes[id].localId = id;
                        }

                        let logicExpression = this.parseLogicExpression(doc[location].Need);
                        let finalRequirements = this.cleanUpLogicalString(
                            this.parseLogicExpressionToString(this.parseFullLogicExpression(logicExpression), 0)
                        );
                        let newLocation = {
                            localId: -1,
                            name: locationName.trim(),  
                            checked: false,
                            logicExpression: logicExpression,
                            needs: finalRequirements,
                            inLogic: this.meetsCompoundRequirement(logicExpression)
                        }
                        let id = locations[group].push(newLocation) - 1;
                        locations[group][id].localId = id;
                        ++checksPerLocation[group]; //counts how many checks are in each location
                        if (locations[group][id].inLogic) {++accessiblePerLocation[group];}
                        ++counter;
                    }
                    console.log(locations)
                    const locationGroups = [];
                    for (var group in locations) {
                        locationGroups.push(group);
                    }
                    this.setState({
                        locations: locations,
                        locationGroups: locationGroups, 
                        totalChecks: counter,
                        checksPerLocation: checksPerLocation,
                        accessiblePerLocation: accessiblePerLocation,
                        goddessCubes: goddessCubes
                    });
                }
            });
        });
    }

    parseLogicExpression(expression) {
        let tokens = expression.split(/([&|()])/);
        //trim all the results
        tokens.forEach((token, index) => {
            tokens[index] = token.trim();
        });
        tokens = tokens.filter(token => token.length > 0);

        let stack = [];
        tokens.forEach(token => {
            if (token === "(") {
                stack.push("(");
            } else if (token === ")") {
                let nestedTokens = [];
                let nestedParenthesesLevel = 0;
                while (stack.length !== 0) {
                    let exp = stack.pop();
                    if (exp === "(") {
                        if (nestedParenthesesLevel === 0) {
                            break;
                        } else {
                            nestedParenthesesLevel--;
                        }
                    }
                    if (exp === ")") {
                        nestedParenthesesLevel++;
                    }
                    nestedTokens.push(exp);
                }
                nestedTokens.reverse();
                stack.push("(");
                stack.push(nestedTokens);
                stack.push(")");
            } else { //found an actual expression
                stack.push(token);
            }
        });
        return stack;
    }

    parseFullLogicExpression(expression) {
        let tokens = expression.slice()
        tokens = tokens.filter(token => token.length > 0);

        let stack = [];
        tokens.forEach(token => {
            if (token === "(") {
                stack.push("(");
            } else if (token === ")") {
                let nestedTokens = [];
                let nestedParenthesesLevel = 0;
                while (stack.length !== 0) {
                    let exp = stack.pop();
                    if (exp === "(") {
                        if (nestedParenthesesLevel === 0) {
                            break;
                        } else {
                            nestedParenthesesLevel--;
                        }
                    }
                    if (exp === ")") {
                        nestedParenthesesLevel++;
                    }
                    if (this.isMacro(exp)) {
                        nestedTokens = nestedTokens.concat(this.parseFullLogicExpression(this.parseMacro(exp)));
                    } else {
                        if (typeof(exp) === "string") {
                            nestedTokens.push(exp)
                        } else {
                            nestedTokens = nestedTokens.concat(this.parseFullLogicExpression(exp));
                        }
                    }
                }
                nestedTokens.reverse();
                stack.push("(");
                stack = stack.concat(nestedTokens);
                stack.push(")");
            } else { //found an actual expression
                if (this.isMacro(token)) {
                    stack = stack.concat(this.parseFullLogicExpression(this.parseMacro(token)));
                } else {
                    if (typeof(token) === "string") {
                        stack.push(token)
                    } else {
                        stack = stack.concat(this.parseFullLogicExpression(token));
                    }
                }
            }
        });
        return stack;
    }

    parseLogicExpressionToString(logicExpression, nestedLevel) {
        let requirements = logicExpression.slice();
        let finalRequirements = [];
        let nestedParenthesesLevel = nestedLevel;
        let current = "";
        requirements.forEach(req => {
            if (typeof(req) === "string") {
                if (req === "(") {
                    if (nestedParenthesesLevel !== 0) {
                        current += "(";
                    }
                    nestedParenthesesLevel--;
                } else if (req === ")") {
                    nestedParenthesesLevel++;
                    if (nestedParenthesesLevel === 0) {
                        finalRequirements.push(current);
                        current = "";
                    } else {
                        current += ")"
                    }
                } else if (req === "&") {
                    if (nestedParenthesesLevel !== 0) {
                        current += " and "
                    } else {
                        finalRequirements.push(current);
                        current = "";
                    }
                } else if (req === "|") {
                    current += " or "
                } else {
                    current += req;
                }
            } else {
                finalRequirements = finalRequirements.concat(this.parseLogicExpressionToString(req, nestedParenthesesLevel));
            }
        });
        if (current !== "") {
            finalRequirements.push(current);
        }
        return finalRequirements;
    }

    cleanUpLogicalString(expressions) {
        let finalRequirements = [];
        expressions.forEach(expression => {
            //remove empty requirements
            if (expression === "") {
                return;
            }
            //exclude duplicates
            if (finalRequirements.includes(expression)) {
                return;
            }
            //check for simple option exclusions (i.e. option or B where the option evaluates to true)
            //check if the requirement contains an option and if is eligible for simple simplification
            // console.log(expression)
            if (expression.includes("Option ") && (!expression.includes(" and ") || !expression.includes("("))) {
                console.log (expression)
                let optionSplit = expression.slice(8).split(/"/)
                console.log(optionSplit)
                if (this.state.options[optionSplit[0]] === (optionSplit[1].split("or")[0].trim() === "Disabled" ? false : true)) {
                    //if the option evaluates to true we can skip this requirement as it will always be met
                    return;
                } else {
                    //otherwise we can strip the option out entirely
                    expression = optionSplit[1].split(" or ").slice(1).join(" ").trim();
                }
            }
            //exclude or requirements where one of the elements is already required
            if (expression.includes(" or ") && !(expression.includes(" and "))) {
                let split = expression.split(" or ");
                if (split.some(element => finalRequirements.includes(element))) {
                    return;
                }
            }
            finalRequirements.push(expression)
        });
        return finalRequirements;
    }

    isLogicSymbol(token) {
        return token !== "&" && token !== "|" && token !== "(" && token !== ")"
    }

    isMacro(macro) {
        if (macro.includes("Goddess Cube")) {
            return false;
        }
        let parsed = this.state.macros[macro];
        if (parsed === undefined) {
            return false;
        }
        if (macro.includes("Gratitude Crystal")) {
            console.log("failing macro as crystal")
            return false;
        }
        if (parsed.includes("|") || parsed.includes("&")) {
            return true;
        }
        if (parsed[0].includes("Progressive")) {
            return false;
        }
        return parsed;
    }

    parseMacro(macro) {
        return this.state.macros[macro];
    }

    checkAllRequirements() {
        for (let group in this.state.locations) {
            this.state.locations[group].forEach(location => {
                location.inLogic = this.meetsCompoundRequirement(location.logicExpression);
                location.logicalState = this.getLogicalState(location.logicExpression, location.inLogic)
            });
        }
        this.state.goddessCubes.forEach(cube => {
            cube.inLogic = this.meetsCompoundRequirement(cube.logicExpression)
            cube.logicalState = this.getLogicalState(cube.logicExpression, cube.inLogic)
        })
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


    /*
    Determines the logic state of a location, based on tracker restrictions. Used for deeper logical rendering and information display.
    The following logical sttes exist, and are used for determing text color in the location tracker
    - in-logic: when the location is completelyin logic
    - out-logic: location is strictly out of logic
    - semi-logic: location is not accessible logically, but the missing items are in a restricted subset of locations (i.e. dungeons wihtout keysanity)
        Also used for cube tracking to show a chest that is accesible but the cube has not been struck or is unmarked, and Batreaux rewards when crystal
        sanity is disbled
    - glitched-logic: ubtainable with glitches (and would be expected in gltiched logic) but only when glitched logic is not required
    */
    getLogicalState(requirements, inLogic) {
        // evaluate for special handling of logica state for locations that have more then 2 logical states
        // the following types of conditions cause multiple logical states
        //  - cubes: can be semi-logic when the cube is obtainable but not marked
        //  - glitched logic tracking: locations that are accessible outside of logic using glitches, only applicable when glitched logic is not active (unimplemented)
        //  - dungeons: locations that are only missing keys (unimplemented)
        //  - batreaux rewards: takes accessible loose crystals into account (even before obtained)
        if (inLogic) {
            return "in-logic"
        }
        let logicState = "out-logic"
        requirements.forEach(requirement => {
            if (requirement.includes("Goddess Cube")) {
                if (this.meetsCompoundRequirement(this.parseMacro(requirement))) {
                    logicState = "semi-logic"
                }
            }
        })
        return logicState;
    }

    //checks an individual requirement for a check
    meetsRequirement(requirement) {
        if (requirement === undefined) {
            return true;
        }
        if (requirement === "Nothing") {
            return true;
        }
        if (requirement.includes("Goddess Cube")) {
            return this.state.obtainedCubes.includes(requirement)
        }
        if (requirement === "(" || requirement === ")" || requirement === "&" || requirement === "|") {
            return true;
        }
        if (requirement.includes("Option ")) {
            let optionSplit = requirement.slice(8).split(/"/)
            // console.log(optionSplit)
            // console.log(optionSplit[1])
            return this.state.options[optionSplit[0]] === (optionSplit[1].trim() === "Disabled" ? false : true)
        }
        let macro = this.state.macros[requirement];
        if (this.state.items.includes(requirement)) {
            return true;
        } else if (macro !== undefined) {
            return this.meetsCompoundRequirement(macro);
        } else {
            return false;
        }
    }

    meetsCompoundRequirement(requirement) {
        let tokens = requirement;
        tokens = tokens.filter(token => token !== "" || token !== " ");
        tokens.reverse();
        let expressionType = "";
        let subexpressionResults = [];
        while(tokens.length > 0) {
            let token = tokens.pop();
            if (token === "|") {
                expressionType = "OR"
            } else if (tokens === "&") {
                expressionType = "AND"
            } else if (token === "(") {
                let nestedExpression = tokens.pop();
                if (nestedExpression === "(") { //nested parenthesis
                    nestedExpression = ["("] + tokens.pop();
                }
                subexpressionResults.push(this.meetsCompoundRequirement(nestedExpression));
                if (tokens.pop() !== ")") {
                    console.log("ERROR: MISSING CLOSING PARENTHESIS")
                }
            } else {
                subexpressionResults.push(this.meetsRequirement(token))
            }
        }

        if (expressionType === "OR") {
            return subexpressionResults.some(result => result)
        } else {
            return subexpressionResults.every(result => result)
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
        console.log("Location clicked");
        const newState = Object.assign({}, this.state.locations); //copy current state
        console.log(this.state.locations)
        newState[group][location].checked = !newState[group][location].checked;
        this.setState({locations: newState});
        let newTotalChecksChecked = this.state.totalChecksChecked;
        newState[group][location].checked ?  ++newTotalChecksChecked : --newTotalChecksChecked;
        this.setState({totalChecksChecked: newTotalChecksChecked});
        const NewStateChecksPerLocation = Object.assign({}, this.state.checksPerLocation);
        newState[group][location].checked ? --NewStateChecksPerLocation[group] : ++NewStateChecksPerLocation[group]; //decrements total checks in area when one is checked and vice-versa
        this.setState({checksPerLocation: NewStateChecksPerLocation});
        if (newState[group][location].inLogic) {
            const NewStateAccessiblePerLocation = Object.assign({}, this.state.accessiblePerLocation);
            newState[group][location].checked ? --NewStateAccessiblePerLocation[group] : ++ NewStateAccessiblePerLocation[group];
            this.setState({accessiblePerLocation: NewStateAccessiblePerLocation});
        }
    }

    handleCubeClick(group, cubeId) {
        console.log("Cube clicked");
        // const newState = Object.assign({}, this.state.goddessCubes); //copy current state
        const newState = this.state.goddessCubes.slice()
        const newCubeList = this.state.obtainedCubes.slice()
        console.log(this.state.goddessCubes)
        let checked = !newState[cubeId].checked
        let cube = newState[cubeId].name
        if (checked) {
            newCubeList.push(cube)
        } else {
            newCubeList.splice(newCubeList.indexOf(cube), 1)
        }
        newState[cubeId].checked = checked
        this.setState({
            goddessCubes: newState,
            obtainedCubes: newCubeList,
            itemClicked: true
        });
    }

    handleItemClick(item) {
        console.log("Handle item click");
        this.setState({
            itemClicked: true,
            trackerItems: this.setItemState(item, this.state.trackerItems[item] < this.state.max[item] ? this.state.trackerItems[item] + 1 : 0)
        });
    }

    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.trackerItems);
        // console.log(newItems)
        newItems[item] = state;
        // console.log(newItems)
        console.log(item)
        this.updateLocationLogic(item, state)
        return newItems;
    }

    itemClickedCounterUpdate() {
        const NewStateAccessiblePerLocation = Object.assign({}, this.state.accessiblePerLocation);
        for (let group in this.state.locations) {
            console.log(group)
            let counter = 0;
            this.state.locations[group].forEach(location => {
                if(location.inLogic && !location.checked){++counter;}
            });
            NewStateAccessiblePerLocation[group] = counter;
        }
        this.setState({accessiblePerLocation: NewStateAccessiblePerLocation});
        this.setState({
            itemClicked: false
        });          
    }

    updateLocationLogic(item, value) {
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
            case "sword":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Practice Sword"), 1);
                        newState.splice(newState.indexOf("Goddess Sword"), 1);
                        newState.splice(newState.indexOf("Goddess Longsword"), 1);
                        newState.splice(newState.indexOf("Goddess White Sword"), 1);
                        newState.splice(newState.indexOf("Master Sword"), 1);
                        newState.splice(newState.indexOf("True Master Sword"), 1);
                        break;
                    case 1:
                        newState.push("Practice Sword");
                        break;
                    case 2:
                        newState.push("Goddess Sword");
                    break;
                    case 3:
                        newState.push("Goddess Longsword");
                    break;
                    case 4:
                        newState.push("Goddess White Sword");
                    break;
                    case 5:
                        newState.push("Master Sword");
                    break;
                    case 6:
                        newState.push("True Master Sword");
                    break;
                    default:
                        break;
                } 
                break;
            case "courage":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Farore's Courage"), 1);
                        break;
                    case 1:
                        newState.push("Farore's Courage");
                        break;
                    default:
                        break;
                }
                break;
            case "power":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Din's Power"), 1);
                        break;
                    case 1:
                        newState.push("Din's Power");
                        break;
                    default:
                        break;
                }
                break;
            case "wisdom":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Nayru's Wisdom"), 1);
                        break;
                    case 1:
                        newState.push("Nayru's Wisdom");
                        break;
                    default:
                        break;
                }
                break;
            case "ballad":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Ballad of the Goddess"), 1);
                        break;
                    case 1:
                        newState.push("Ballad of the Goddess");
                        break;
                    default:
                        break;
                }
                break;
            case "soth":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Faron Song of the Hero Part"), 1);
                        newState.splice(newState.indexOf("Eldin Song of the Hero Part"), 1);
                        newState.splice(newState.indexOf("Lanayru Song of the Hero Part"), 1);
                        break;
                    case 1:
                        newState.push("Faron Song of the Hero Part");
                        break;
                    case 2:
                        newState.push("Eldin Song of the Hero Part");
                        break;
                    case 3:
                        newState.push("Lanayru Song of the Hero Part");
                        break;
                    default:
                        break;
                }
                break;
            case "harp":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Goddess Harp"), 1);
                        break;
                    case 1:
                        newState.push("Goddess Harp");
                        break;
                    default:
                        break;
                }
                break;

            // Non B Items
            case "sailcloth":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Sailcloth"), 1);
                        break;
                    case 1:
                        newState.push("Sailcloth");
                        break;
                    default:
                        break;
                }
                break;
            case "scale":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Water Scale"), 1);
                        break;
                    case 1:
                        newState.push("Water Scale");
                        break;
                    default:
                        break;
                }
                break;
            case "earrings":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Fireshield Earrings"), 1);
                        break;
                    case 1:
                        newState.push("Fireshield Earrings");
                        break;
                    default:
                        break;
                }
                break;
            case "mitts":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Digging Mitts"), 1);
                        newState.splice(newState.indexOf("Mogma Mitts"), 1);
                        break;
                    case 1:
                        newState.push("Digging Mitts");
                        break;
                    case 2:
                        newState.push("Mogma Mitts");
                        break;
                    default:
                        break;
                }
                break;

            // Other
            case "stone":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Stone of Trials"), 1);
                        break;
                    case 1:
                        newState.push("Stone of Trials");
                        break;
                    default:
                        break;
                }
                break;         
            case "emeraldTablet":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Emerald Tablet"), 1);
                        break;
                    case 1:
                        newState.push("Emerald Tablet");
                        break;
                    default:
                        break;
                } 
                break;
            case "rubyTablet":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Ruby Tablet"), 1);
                        break;
                    case 1:
                        newState.push("Ruby Tablet");
                        break;
                    default:
                        break;
                }                break;
            case "amberTablet":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Amber Tablet"), 1);
                        break;
                    case 1:
                        newState.push("Amber Tablet");
                        break;
                    default:
                        break;
                }                break;
            //Boss Keys
            case "stBossKey":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("SW Boss Key"), 1);
                        break;
                    case 1:
                        newState.push("SW Boss Key");
                        break;
                    default:
                        break;
                }               break;
            case "etBossKey":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("ET Boss Key"), 1);
                        break;
                    case 1:
                        newState.push("ET Boss Key");
                        break;
                    default:
                        break;
                }               break;
            case "lmfBossKey":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("LMF Boss Key"), 1);
                        break;
                    case 1:
                        newState.push("LMF Boss Key");
                        break;
                    default:
                        break;
                }               break;
            case "acBossKey":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("AC Boss Key"), 1);
                        break;
                    case 1:
                        newState.push("AC Boss Key");
                        break;
                    default:
                        break;
                }               break;
            case "sshBossKey":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("SS Boss Key"), 1);
                        break;
                    case 1:
                        newState.push("SS Boss Key");
                        break;
                    default:
                        break;
                }
                break;
            case "fsBossKey":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("FS Boss Key"), 1);
                        break;
                    case 1:
                        newState.push("FS Boss Key");
                        break;
                    default:
                        break;
                }
                break;
            //Small Keys
            case "stSmall":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("SW Small Key x1"), 1);
                        newState.splice(newState.indexOf("SW Small Key x2"), 1);
                        break;
                    case 1:
                        newState.push("SW Small Key x1");
                        break;
                    case 2:
                        newState.push("SW Small Key x2");
                        break;
                    default:
                        break;
                }               break;
            case "etEntry":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Key Piece x5"), 1);
                        break;
                    case 5:
                        newState.push("Key Piece x5");
                        break;
                    default:
                        break;
                }               break;
            case "lmfSmall":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("LMF Small Key x1"), 1);
                        break;
                    case 1:
                        newState.push("LMF Small Key x1");
                        break;
                    default:
                        break;
                }               break;
            case "acSmall":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("AC Small Key x1"), 1);
                        newState.splice(newState.indexOf("AC Small Key x2"), 1);
                        break;
                    case 1:
                        newState.push("AC Small Key x1");
                        break;
                    case 2:
                        newState.push("AC Small Key x2");
                        break;
                    default:
                        break;
                }               break;
            case "sshSmall":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("SS Small Key x1"), 1);
                        newState.splice(newState.indexOf("SS Small Key x2"), 1);
                        break;
                    case 1:
                        newState.push("SS Small Key x1");
                        break;
                    case 2:
                        newState.push("SS Small Key x2");
                        break;
                    default:
                        break;
                }               break;
            case "fsSmall":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("FS Small Key x1"), 1);
                        newState.splice(newState.indexOf("FS Small Key x2"), 1);
                        newState.splice(newState.indexOf("FS Small Key x3"), 1);
                        break;
                    case 1:
                        newState.push("FS Small Key x1");
                        break;
                    case 2:
                        newState.push("FS Small Key x2");
                        break;
                    case 3:
                        newState.push("FS Small Key x3");
                        break;
                    default:
                        break;
                }               break;
            case "skSmall":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("SK Small Key x1"), 1);
                        break;
                    case 1:
                        newState.push("SK Small Key x1");
                        break;
                    default:
                        break;
                }
            break;

            //quest items
            case "letter":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Cawlin's Letter"), 1);
                        break;
                    case 1:
                        newState.push("Cawlin's Letter");
                        break;
                    default:
                        break;
                }
                break;
                case "cBeetle":
                    switch (value) {
                        case 0:
                            newState.splice(newState.indexOf("Horned Colossus Beetle"), 1);
                            break;
                        case 1:
                            newState.push("Horned Colossus Beetle");
                            break;
                        default:
                            break;
                    }
                    break;
                case "rattle":
                    switch (value) {
                        case 0:
                            newState.splice(newState.indexOf("Baby Rattle"), 1);
                            break;
                        case 1:
                            newState.push("Baby Rattle");
                            break;
                        default:
                            break;
                    }
                    break;
                case "crystals":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Gratitude Crystal x5"), 1);
                        newState.splice(newState.indexOf("Gratitude Crystal x10"), 1);
                        newState.splice(newState.indexOf("Gratitude Crystal x15"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x1"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x2"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x3"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x4"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x5"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x6"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x7"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x8"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x9"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x10"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x11"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x12"), 1);
                        newState.splice(newState.indexOf("5 Gratitude Crystals x13"), 1);
                        break;
                    case 1:
                        newState.push("Gratitude Crystal x5");
                        break;
                    case 2:
                        newState.push("Gratitude Crystal x10");
                        break;
                    case 3:
                        newState.push("Gratitude Crystal x15");
                        break;
                    case 4:
                        newState.push("5 Gratitude Crystals x1");
                        break;
                    case 5:
                        newState.push("5 Gratitude Crystals x2");
                        break;
                    case 6:
                        newState.push("5 Gratitude Crystals x3");
                        break;
                    case 7:
                        newState.push("5 Gratitude Crystals x4");
                        break;
                    case 8:
                        newState.push("5 Gratitude Crystals x5");
                        break;
                    case 9:
                        newState.push("5 Gratitude Crystals x6");
                        break;
                    case 10:
                        newState.push("5 Gratitude Crystals x7");
                        break;
                    case 11:
                        newState.push("5 Gratitude Crystals x8");
                        break;
                    case 12:
                        newState.push("5 Gratitude Crystals x9");
                        break;
                    case 13:
                        newState.push("5 Gratitude Crystals x10");
                        break;
                    case 14:
                        newState.push("5 Gratitude Crystals x11");
                        break;
                    case 15:
                        newState.push("5 Gratitude Crystals x12");
                        break;
                    case 16:
                        newState.push("5 Gratitude Crystals x13");
                        break;
                    default:
                        break;
                }
                break;

            //additional items
            case "seaChart":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Sea Chart"), 1);
                        break;
                    case 1:
                        newState.push("Sea Chart");
                        break;
                    default:
                        break;
                }
                break;
            case "cavesKey":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("LanayruCaves Small Key x1"), 1);
                        break;
                    case 1:
                        newState.push("LanayruCaves Small Key x1");
                        break;
                    default:
                        break;
                }
                break;
            case "bottle":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Empty Bottle"), 1);
                        break;
                    case 1:
                        newState.push("Empty Bottle");
                        break;
                    default:
                        break;
                }
                break;
            case "pouch":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Progressive Pouch"), 1);
                        break;
                    case 1:
                        newState.push("Progressive Pouch");
                        break;
                    default:
                        break;
                }
                break;
            case "spiralCharge":
                switch (value) {
                    case 0:
                        newState.splice(newState.indexOf("Sprial Charge"), 1);
                        break;
                    case 1:
                        newState.push("Spiral Charge");
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        this.setState({items: newState});
        this.setState(prevState => ({
            itemClicked: true
        }));
    }
    
    importState(state) {
        this.setState(state)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
}

export default Tracker;
