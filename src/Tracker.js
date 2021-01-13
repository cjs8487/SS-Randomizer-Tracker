import React from 'react';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/itemTracker'
import BasicCounters from './BasicCounters'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/cjs/Row";
import ImportExport from "./import-export";
import DungeonTracker from './itemTracker/dungeonTracker';
import QuineMcCluskey from 'quine-mccluskey-js/quinemccluskey'
import CubeTracker from './locationTracker/cubeTracker';
import {SketchPicker} from 'react-color'
import BooleanExpression from './logic/BooleanExpression';
import _ from 'lodash'
import Button from 'react-bootstrap/Button';
import ColorScheme from './customization/colorScheme';
import CustomizationModal from './customization/customizationModal';
import Logic from './logic/Logic';

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
        let svEntered = 0;
        let etEntered = 0;
        let lmfEntered = 0;
        let acEntered = 0;
        let sshEntered = 0;
        let fsEntered = 0;
        let skEntered = 0;
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
        if (json.entrancesRandomized === "None") {
            startingItems.push("Entered Skyview");
            startingItems.push("Entered Earth Temple");
            startingItems.push("Entered Lanayru Mining Facility");
            startingItems.push("Entered Ancient Cistern");
            startingItems.push("Entered Sandship");
            startingItems.push("Entered Fire Sanctuary");
            startingItems.push("Entered Skykeep");
            svEntered = 1;
            etEntered = 1;
            lmfEntered = 1;
            acEntered = 1;
            sshEntered = 1;
            fsEntered = 1;
            skEntered = 1;
        }
        if (json.entrancesRandomized === "Dungeons") {
            startingItems.push("Entered Skykeep");
            skEntered = 1;
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
                svEntered: svEntered,
                etEntered: etEntered,
                lmfEntered: lmfEntered,
                acEntered: acEntered,
                sshEntered: sshEntered,
                fsEntered: fsEntered,
                skEntered: skEntered,
                svName: 0,
                etName: 0,
                lmfName: 0,
                acName: 0,
                sshName: 0,
                fsName: 0,
                skName: 0,
                svBossKey: 0,
                etBossKey: 0,
                lmfBossKey: 0,
                acBossKey: 0,
                sshBossKey: 0,
                fsBossKey: 0,
                triforce: 0,
                svSmall: 0,
                svSmall_1: 0,
                svSmall_2: 0,
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
                svEntered: 1,
                etEntered: 1,
                lmfEntered: 1,
                acEntered: 1,
                sshEntered: 1,
                fsEntered: 1,
                skEntered: 1,
                svName: 1,
                etName: 1,
                lmfName: 1,
                acName: 1,
                sshName: 1,
                fsName: 1,
                skName: 1,
                svBossKey: 1,
                etBossKey: 1,
                lmfBossKey: 1,
                acBossKey: 1,
                sshBossKey: 1,
                fsBossKey: 1,
                triforce: 3,
                svSmall: 2,
                svSmall_1: 0,
                svSmall_2: 0,
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
            showCustomizationDialog: false,
            colorScheme: new ColorScheme(),
            requiredDungeons: [],
            completedDungeons: [],
        };
        //this.setState({options: json})
         //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCubeClick = this.handleCubeClick.bind(this);
        this.handleDungeonClick = this.handleDungeonClick.bind(this);
        this.parseLogicExpression = this.parseLogicExpression.bind(this);
        this.parseFullLogicExpression = this.parseFullLogicExpression.bind(this);
        this.parseLogicExpressionToString = this.parseLogicExpressionToString.bind(this);
        this.isLogicSymbol = this.isLogicSymbol.bind(this);
        this.isMacro = this.isMacro.bind(this);
        this.parseMacro = this.parseMacro.bind(this);
        this.meetsRequirements = this.meetsRequirements.bind(this);
        this.meetsRequirement = this.meetsRequirement.bind(this);
        this.meetsCompoundRequirement = this.meetsCompoundRequirement.bind(this);
        this.updateLocationLogic = this.updateLocationLogic.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.importState = this.importState.bind(this);
        this.updateColorScheme = this.updateColorScheme.bind(this);
        this.updatePastMacro = this.updatePastMacro.bind(this);
        this.initialize();
    }
    
    render() {
        // ensure that logic is properly initialized befopre attempting to render the actual tracker
        if (_.isNil(this.state.logic)) {
            return (
                <div />
            )
        }
        this.state.logic.checkAllRequirements();
        if(this.state.itemClicked){
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
            width: this.state.width/3,
        }
        
        return (
            <div style={{height: "auto"}}>
                <Container fluid style={{background: this.state.colorScheme.background}}>
                    <Row>
                        <Col>
                            <Row style={{paddingLeft: "3%"}}>
                                    <ItemTracker updateLogic={this.updateLocationLogic} styleProps={itemTrackerStyle}
                                                items={this.state.trackerItems}
                                                logic={this.state.logic}
                                                checksPerLocation={this.state.checksPerLocation}
                                                accessiblePerLocation={this.state.accessiblePerLocation}
                                                handleItemClick={this.handleItemClick}
                                                colorScheme={this.state.colorScheme}
                                    />
                            </Row>
                        </Col>
                        <Col style={{overflowY: "scroll", overflowX: "auto"}}>
                            <LocationTracker className="overflowAuto" style={locationTrackerStyle}
                                            items={this.state.trackerItems}
                                            logic={this.state.logic}
                                             expandedGroup={this.state.expandedGroup}
                                             handleGroupClick={this.handleGroupClick}
                                             handleLocationClick={this.handleLocationClick}
                                             meetsRequirement={this.meetsRequirement}
                                             checksPerLocation={this.state.checksPerLocation}
                                             accessiblePerLocation={this.state.accessiblePerLocation}
                                             colorScheme={this.state.colorScheme}
                            />
                        </Col>
                        <Col>
                            <Row>
                                <BasicCounters style={countersStyle}
                                            totalChecks = {this.state.totalChecks}
                                            totalChecksChecked = {this.state.totalChecksChecked}
                                            accessiblePerLocation={this.state.accessiblePerLocation}
                                            locationGroups={this.state.locationGroups}
                                            colorScheme={this.state.colorScheme}
                                />
                            </Row>
                            <Row noGutters>
                                <DungeonTracker styleProps={dungeonTrackerStyle} updateLogic={this.updateLogic} handleItemClick={this.handleItemClick}       
                                            handleDungeonUpdate={this.handleDungeonClick}
                                            items={this.state.trackerItems}
                                            logic={this.state.logic}
                                            checksPerLocation={this.state.checksPerLocation} 
                                            accessiblePerLocation={this.state.accessiblePerLocation}
                                            skykeep={!this.state.options.skipSkykeep}
                                            completedDungeons={this.state.completedDungeons}
                                            entranceRando={this.state.options.entrancesRandomized}
                                            colorScheme={this.state.colorScheme}
                                />
                                </Row>
                            <Row style={{paddingRight: "10%", paddingTop: "5%"}}>
                                <Col style={{overflowY: "scroll", overflowX: "auto", height: this.state.height / 2}}>
                                    <CubeTracker className="overflowAuto"
                                        locations={this.state.goddessCubes}
                                        meetsRequirement={this.meetsRequirement}
                                        locationHandler={this.handleCubeClick}
                                        colorScheme={this.state.colorScheme}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{position: "fixed", bottom: 0, background: "lightgrey", width: "100%", padding: "0.5%"}}>
                        <Col>
                            <ImportExport state={this.state} importFunction={this.importState}/>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.setState({showCustomizationDialog: true})}>Customization</Button>
                        </Col>
                    </Row>
                </Container>
                <CustomizationModal
                    show={this.state.showCustomizationDialog}
                    onHide={() => this.setState({showCustomizationDialog: false})}
                    colorScheme={this.state.colorScheme}
                    updateColorScheme={this.updateColorScheme}
                />
            </div>
        )
    }

    componentDidMount() {
        //updating window properties
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);  
        //request and parse the locations and macros yaml file from the randomizer repositroy
        //This ensures that we always have up to date locations and logic
        // request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Macros.yaml', (error, response, body) => {
        //     if (error || response.statusCode !== 200) return;
        //     const macros = yaml.safeLoad(body);
        //     let parsedMacros = {};
        //     for (let macro in macros) {
        //         parsedMacros[macro] = this.parseLogicExpression(macros[macro])
        //     }
        //     if (this.state.options.entrancesRandomized === "None") {
        //         //no entrance randomizer, sub default macros in
        //         parsedMacros["Can Access Skyview"] = parsedMacros["Can Access Dungeon Entrance In Deep Woods"];
        //         parsedMacros["Can Access Earth Temple"] = parsedMacros["Can Access Dungeon Entrance In Eldin Volcano"];
        //         parsedMacros["Can Access Lanayru Mining Facility"] = parsedMacros["Can Access Dungeon Entrance In Lanayru Desert"];
        //         parsedMacros["Can Access Ancient Cistern"] = parsedMacros["Can Access Dungeon Entrance In Lake Floria"];
        //         parsedMacros["Can Access Sandship"] = parsedMacros["Can Access Dungeon Entrance In Sand Sea"];
        //         parsedMacros["Can Access Fire Sanctuary"] = parsedMacros["Can Access Dungeon Entrance In Volcano Summit"];
        //         parsedMacros["Can Access Skykeep"] = parsedMacros["Can Access Dungeon Entrance On Skyloft"];
        //     }
        //     else if (this.state.options.entrancesRandomized === "Dungeons") {
        //         parsedMacros["Can Access Skyview"] = this.parseLogicExpression("Entered Skyview");
        //         parsedMacros["Can Access Earth Temple"] = this.parseLogicExpression("Entered Earth Temple");
        //         parsedMacros["Can Access Lanayru Mining Facility"] = this.parseLogicExpression("Entered Lanayru Mining Facility");
        //         parsedMacros["Can Access Ancient Cistern"] = this.parseLogicExpression("Entered Ancient Cistern");
        //         parsedMacros["Can Access Sandship"] = this.parseLogicExpression("Entered Sandship");
        //         parsedMacros["Can Access Fire Sanctuary"] = this.parseLogicExpression("Entered Fire Sanctuary");
        //         parsedMacros["Can Access Skykeep"] = parsedMacros["Can Access Dungeon Entrance On Skyloft"];
        //     }
        //     else {
        //         parsedMacros["Can Access Skyview"] = this.parseLogicExpression("Entered Skyview");
        //         parsedMacros["Can Access Earth Temple"] = this.parseLogicExpression("Entered Earth Temple");
        //         parsedMacros["Can Access Lanayru Mining Facility"] = this.parseLogicExpression("Entered Lanayru Mining Facility");
        //         parsedMacros["Can Access Ancient Cistern"] = this.parseLogicExpression("Entered Ancient Cistern");
        //         parsedMacros["Can Access Sandship"] = this.parseLogicExpression("Entered Sandship");
        //         parsedMacros["Can Access Fire Sanctuary"] = this.parseLogicExpression("Entered Fire Sanctuary");
        //         parsedMacros["Can Access Skykeep"] = this.parseLogicExpression("Entered Skykeep");
        //     }
        //     parsedMacros["Can Access Past"] = ["Goddess Harp", "&", "Master Sword", "&", "Can Complete Required Dungeons"]
        //     parsedMacros["Can Complete Required Dungeons"] = ["Nothing"]

        //     this.setState({macros: parsedMacros, unparsedMacros: macros})
        //     request.get('https://raw.githubusercontent.com/lepelog/sslib/master/SS%20Rando%20Logic%20-%20Item%20Location.yaml', (error, response, body) => {
        //         if (!error && response.statusCode === 200) {
        //             const doc = yaml.safeLoad(body);
        //             const locations = {};
        //             let counter = 0;
        //             let checksPerLocation = {};
        //             let accessiblePerLocation = {};
        //             let goddessCubes = [];
        //             for (var location in doc) {
        //                 const types = doc[location].type.split(",")
        //                 if (types.some(type => this.state.options.bannedLocations.includes(type.trim()))) {
        //                     continue;
        //                 }
        //                 const splitName = location.split('-');
        //                 let group = splitName[0].trim(); //group is the area the location belongs to (e.g. Skyloft, Faron, etc.)
        //                 if (group === 'Skykeep' && this.state.options.skipSkykeep) {
        //                     continue;
        //                 }
        //                 //fix groups that have specific naming for randomizer reasons
        //                 if (group === 'Skyview Boss Room' || group === 'Skyview Spring') {
        //                     group = 'Skyview'
        //                 } else if (group === 'ET Boss Room' || group === 'ET Spring') {
        //                     group = 'Earth Temple';
        //                 } else if (group === 'LMF boss room') {
        //                     group = 'Lanayru Mining Facility';
        //                 } else if (group === 'AC Boss Room') {
        //                     group = 'Ancient Cistern';
        //                 } else if (group === 'Skyloft Silent Realm') {
        //                     group = 'Skyloft';
        //                 } else if (group === 'Faron Silent Realm') {
        //                     group = 'Faron Woods';
        //                 } else if (group === 'Eldin Silent Realm') {
        //                     group = 'Eldin Volcano';
        //                 } else if (group === 'Lanayru Silent Realm') {
        //                     group = 'Lanayru';
        //                 } else if (group === 'Skykeep') {
        //                     group = 'Sky Keep';
        //                 }
        //                 const locationName = splitName.splice(1).join('-').trim();
        //                 if (locations[group] == null) {
        //                     locations[group] = [];
        //                 }
        //                 // if (goddessCubes[group] == null) {
        //                 //     goddessCubes[group] = [];
        //                 // }
        //                 if (checksPerLocation[group]== null) { //creates new entries in dictionary if location wasn't present before
        //                     checksPerLocation[group] = 0;
        //                 }
        //                 if (accessiblePerLocation[group]== null) {
        //                     accessiblePerLocation[group] = 0;
        //                 }

        //                 if (location.includes("Goddess Chest")) {
        //                     let reqs = doc[location].Need.split(' & ')
        //                     let cubeReq = reqs.filter(req => req.includes("Goddess Cube"))[0].trim()
        //                     let cube = {
        //                         localId: -1,
        //                         name: cubeReq.trim(),
        //                         logicExpression: this.state.macros[cubeReq],
        //                         needs: this.cleanUpLogicalString(
        //                             this.parseLogicExpressionToString(this.parseFullLogicExpression(this.state.macros[cubeReq]), 0)
        //                         ),
        //                         inLogic: this.meetsRequirements(this.state.macros[cubeReq])
        //                     }
        //                     let id = goddessCubes.push(cube) - 1;
        //                     goddessCubes[id].localId = id;
        //                 }

        //                 let logicExpression = this.parseLogicExpression(doc[location].Need);
        //                 // let finalRequirements = this.cleanUpLogicalString(
        //                 let finalRequirements = 
        //                     this.parseLogicExpressionToString(this.parseFullLogicExpression(logicExpression), 0)
        //                 // );
        //                 let booleanExpression = this.booleanExpressionForRequirements(doc[location].Need)
        //                 let simplified = booleanExpression.simplify({
        //                     implies: (firstRequirement, secondRequirement) => this.requirementImplies(firstRequirement, secondRequirement)
        //                 })
        //                 let evaluatedLocations = this.evaluatedRequirements(simplified)
        //                 let readablerequirements = this.createReadableRequirements(evaluatedLocations)
                    
        //                 let newLocation = {
        //                     localId: -1,
        //                     name: locationName.trim(),  
        //                     checked: false,
        //                     logicExpression: logicExpression,
        //                     needs: readablerequirements,
        //                     finalRequirements: finalRequirements,
        //                     inLogic: this.meetsCompoundRequirement(logicExpression),
        //                     booleanExpression: booleanExpression,
        //                     simplified: simplified,
        //                     evaluatedLocations: evaluatedLocations
        //                 }
        //                 let id = locations[group].push(newLocation) - 1;
        //                 locations[group][id].localId = id;
        //                 ++checksPerLocation[group]; //counts how many checks are in each location
        //                 if (locations[group][id].inLogic) {++accessiblePerLocation[group];}
        //                 ++counter;
        //             }
        //             const locationGroups = [];
        //             for (var group in locations) {
        //                 locationGroups.push(group);
        //             }
        //             this.setState({
        //                 locations: locations,
        //                 locationGroups: locationGroups, 
        //                 totalChecks: counter,
        //                 checksPerLocation: checksPerLocation,
        //                 accessiblePerLocation: accessiblePerLocation,
        //                 goddessCubes: goddessCubes
        //             });
        //         }
        //     });
        // });

        // let booleanExpression = this.booleanExpressionForRequirements("Can Access Lake Floria")
        // console.log(booleanExpression)
        // let simplified = booleanExpression.simplify();
        // console.log(simplified)
    }

    async initialize() {
        const logic = new Logic();
        await logic.initialize(this.state.options);
        this.setState({logic: logic});
        // this.state = {...this.state, logic: logic}
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
                let optionSplit = expression.slice(8).split(/"/)
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

    createTruthTable(logicSentence) {
        //find the individual implicants that make up this logical expression (implicants is likely not the correct word but whatever)
        let implicants = []
        logicSentence.forEach(part => {
            if (part === '(' || part === ')' || part === '&' || part === '|') return;
            if (!implicants.includes(part)) {
                implicants.push(part)
            }
        });
        console.log(implicants)
        let numImplicants = implicants.length;
        let numTerms = Math.pow(2, numImplicants)
        console.log("number of implicants: %d, number of terms in truth table: %d", numImplicants, numTerms)
        let table = [];
        for (let i = 0; i < numTerms; i++) {
            let row = [];
            let binary = i.toString(2)
            let needsFlip = false;
            for (let j = 0; j < numImplicants; j++) {
                let val = binary[j];
                if (val === undefined) {
                    val = 0;
                    needsFlip = false;
                } else {
                    val = parseInt(val)
                }
                row[j] = val;
            }
            if (needsFlip) {
                row.reverse();
            }
            let testSentence = [];
            logicSentence.forEach(item => {
                let implicantIndex = implicants.indexOf(item);
                if (implicantIndex === -1) {
                    testSentence.push(item)
                } else {
                    if (row[implicantIndex] === 1) {
                        testSentence.push("Nothing");
                    } else {
                        testSentence.push(item);
                    }
                }
            })
            console.log(row)
            console.log(testSentence)
            row[numImplicants] = this.meetsCompoundRequirement(testSentence) ? 1 : 0
            table[i] = row;
        }
        console.log(table)
        return [table, numTerms, numImplicants, implicants];
    }

    findMinterms(table, numTerms, numImplicants) {
        let minterms = [];
        let solutionIndex = numImplicants;
        for (let i = 0; i < numTerms; i++) {
            if (table[i][solutionIndex] === 1) {
                minterms.push(i)
            }
        }
        console.log(minterms);
        return minterms;
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
        // if (requirement.includes("Option ")) {
        //     let optionSplit = requirement.slice(8).split(/"/)
        //     // console.log(optionSplit)
        //     // console.log(optionSplit[1])
        //     return this.state.options[optionSplit[0]] === (optionSplit[1].trim() === "Disabled" ? false : true)
        // }
        // let macro = this.state.logic.getMacro(requirement);
        // if (this.state.items.includes(requirement)) {
        //     return true;
        // } else if (macro !== undefined) {
        //     return this.meetsCompoundRequirement(macro);
        // } else {
        //     return false;
        // }
        return this.state.logic.isRequirementMet(requirement);
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
        const newState = Object.assign({}, this.state.locations); //copy current state
        const newCompletedDungeons = this.state.completedDungeons.slice()
        const newItems = this.state.items.slice();
        // newState[group][location].checked = !newState[group][location].checked;
        location.checked = !location.checked
        this.state.logic.updateCounters(group, location.checked);
        // handle any locations that contribute to additional factors, such as dungeon tracking
        let add = location.checked;
        switch (location.name) {
            case "Ruby Tablet":
                if (add) {
                    newCompletedDungeons.push("Skyview")
                    newItems.push("Skyview Completed")
                } else {
                    newCompletedDungeons.splice(newCompletedDungeons.indexOf("Skyview"), 1)
                    newItems.splice(newItems.indexOf("Skyview Completed"), 1)
                }
                this.setState({itemClicked: true})
                break;
            case "Amber Tablet":
                if (add) {
                    newCompletedDungeons.push("Earth Temple")
                    newItems.push("Earth Temple Completed")
                } else {
                    newCompletedDungeons.splice(newCompletedDungeons.indexOf("Earth Temple"), 1)
                    newItems.splice(newItems.indexOf("Earth Temple Completed"), 1)
                }
                this.setState({itemClicked: true})
                break;
            case "Harp":
                if (add) {
                    newCompletedDungeons.push("Lanayru Mining Facility")
                    newItems.push("Lanayru Mining Facility Completed")
                } else {
                    newCompletedDungeons.splice(newCompletedDungeons.indexOf("Lanayru Mining Facility"), 1)
                    newItems.splice(newItems.indexOf("Lanayru Mining Facility Completed"), 1)
                }
                break;
            case "Goddess Longsword":
                if (add) {
                    newCompletedDungeons.push("Ancient Cistern")
                    newItems.push("Ancient Cistern Completed")
                } else {
                    newCompletedDungeons.splice(newCompletedDungeons.indexOf("Ancient Cistern"), 1)
                    newItems.splice(newItems.indexOf("Ancient Cistern Completed"), 1)
                }
                this.setState({itemClicked: true})
                break;
            case "Nayru's Flame":
                if (add) {
                    newCompletedDungeons.push("Sandship")
                    newItems.push("Sandship Completed")
                } else {
                    newCompletedDungeons.splice(newCompletedDungeons.indexOf("Sandship"), 1)
                    newItems.splice(newItems.indexOf("Sandship Completed"), 1)
                }
                this.setState({itemClicked: true})
                break;
            case "Din's Flame":
                if (add) {
                    newCompletedDungeons.push("Fire Sanctuary")
                    newItems.push("Fire Sanctuary Completed")
                } else {
                    newCompletedDungeons.splice(newCompletedDungeons.indexOf("Fire Sanctuary"), 1)
                    newItems.splice(newItems.indexOf("Fire Sanctuary Completed"), 1)
                }
                this.setState({itemClicked: true})
                break;
            default:
                break;
        }
        this.setState({locations: newState, completedDungeons: newCompletedDungeons, items: newItems});
        let newTotalChecksChecked = this.state.totalChecksChecked;
        location.checked ?  ++newTotalChecksChecked : --newTotalChecksChecked;
        this.setState({totalChecksChecked: newTotalChecksChecked});
        const NewStateChecksPerLocation = Object.assign({}, this.state.checksPerLocation);
        location.checked ? --NewStateChecksPerLocation[group] : ++NewStateChecksPerLocation[group]; //decrements total checks in area when one is checked and vice-versa
        this.setState({checksPerLocation: NewStateChecksPerLocation});
        
        if (location.inLogic) {
            const NewStateAccessiblePerLocation = Object.assign({}, this.state.accessiblePerLocation);
            location.checked ? --NewStateAccessiblePerLocation[group] : ++ NewStateAccessiblePerLocation[group];
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
        console.log("Item click")
        this.state.logic.giveItem(item)
        this.state.logic.checkAllRequirements();
        this.state.logic.updateCountersForItem();
        this.setState({logic: this.state.logic})
        // this.setState({
        //     itemClicked: true,
        //     trackerItems: this.setItemState(item, this.state.trackerItems[item] < this.state.max[item] ? this.state.trackerItems[item] + 1 : 0),
        // });
    }

    handleDungeonClick(dungeon) {
        let newRequiredDungeons = this.state.requiredDungeons.slice();
        if (newRequiredDungeons.includes(dungeon)) {
            newRequiredDungeons.splice(newRequiredDungeons.indexOf(dungeon), 1)
        } else {
            newRequiredDungeons.push(dungeon);
        }
        this.updatePastMacro(newRequiredDungeons)
        this.setState({requiredDungeons: newRequiredDungeons});
    }

    updatePastMacro(dungeons) {
        // let newMacro = this.parseLogicExpression("Goddess Harp & Master Sword")
        let newMacroString = ""
        let updatedLocations = Object.assign({}, this.state.locations)
        let tmsLocation = updatedLocations["Sealed Grounds"][3];
        let newReqs = tmsLocation.needs.slice(0, 3);
        dungeons.forEach((dungeon, index) => {
            if (index > 0) {
                newMacroString += " & "
            }
            newMacroString += `(Can Beat ${dungeon} | ${dungeon} Completed)`
            // newMacro.push("&")
            // newMacro.push(this.state.macros[macroString])
            if (dungeon === "Skykeep") {
                dungeon = "Sky Keep" //account for inconsistent spellings
            }
            newReqs.push(`${dungeon} Completed`)
        })
        let newMacros = Object.assign({}, this.state.macros)
        newMacros["Can Complete Required Dungeons"] = this.parseLogicExpression(newMacroString);
        newReqs = this.cleanUpLogicalString(newReqs)
        this.setState({macros: newMacros}, () => {
            tmsLocation.needs = newReqs
            updatedLocations["Sealed Grounds"][3] = tmsLocation;
            this.setState({locations: updatedLocations})
        })
    }

    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.trackerItems);
        newItems[item] = state;
        this.updateLocationLogic(item, state)
        return newItems;
    }

    itemClickedCounterUpdate() {
        const NewStateAccessiblePerLocation = Object.assign({}, this.state.accessiblePerLocation);
        for (let group in this.state.locations) {
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

    updateColorScheme(colorScheme) {
        this.setState({colorScheme: colorScheme})
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
            //Dungeon Entrances
            case "svEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Skyview"), 1);
                        break;
                    case 1:
                        newState.push("Entered Skyview");
                        break;
                    default:
                        break;
                }               break;
                case "etEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Earth Temple"), 1);
                        break;
                    case 1:
                        newState.push("Entered Earth Temple");
                        break;
                    default:
                        break;
                }               break;
                case "lmfEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Lanayru Mining Facility"), 1);
                        break;
                    case 1:
                        newState.push("Entered Lanayru Mining Facility");
                        break;
                    default:
                        break;
                }               break;
                case "acEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Ancient Cistern"), 1);
                        break;
                    case 1:
                        newState.push("Entered Ancient Cistern");
                        break;
                    default:
                        break;
                }               break;
                case "sshEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Sandship"), 1);
                        break;
                    case 1:
                        newState.push("Entered Sandship");
                        break;
                    default:
                        break;
                }               break;
                case "fsEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Fire Sanctuary"), 1);
                        break;
                    case 1:
                        newState.push("Entered Fire Sanctuary");
                        break;
                    default:
                        break;
                }               break;
                case "skEntered":
                switch(value) {
                    case 0:
                        newState.splice(newState.indexOf("Entered Skykeep"), 1);
                        break;
                    case 1:
                        newState.push("Entered Skykeep");
                        break;
                    default:
                        break;
                }               break;
            //Boss Keys
            case "svBossKey":
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
            case "svSmall":
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
