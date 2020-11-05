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
            items: [],
            totalChecks: 0,
            totalChecksChecked: 0,
            checksPerLocation: {},
            accessiblePerLocation: {},
            width: window.innerWidth,
            height: window.innerHeight,
            itemClicked: false
        };
         //bind this to handlers to ensure that context is correct when they are called so they have access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.parseLogicExpression = this.parseLogicExpression.bind(this);
        this.parseFullLogicExpression = this.parseFullLogicExpression.bind(this);
        this.parseLogicExpressionToString = this.parseLogicExpressionToString.bind(this);
        this.isLogicSymbol = this.isLogicSymbol.bind(this);
        this.isMacro = this.isMacro.bind(this);
        this.parseMacro = this.parseMacro.bind(this);
        this.checkAllRequirements = this.checkAllRequirements.bind(this);
        this.meetsRequirements = this.meetsRequirements.bind(this);
        this.meetsRequirement = this.meetsRequirement.bind(this);
        this.meetsCompoundRequirement = this.meetsCompoundRequirement.bind(this);
        this.updateLocationLogic = this.updateLocationLogic.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
            let parsedMacros = [];
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
                    const locations = [];
                    let counter = 0;
                    let checksPerLocation = {};
                    let accessiblePerLocation = {};
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
                        } else if (group === 'Lanayru Silent Realm') {
                            group = 'Lanayru';
                        } else if (group === 'Skykeep') {
                            group = 'Sky Keep';
                        }
                        const locationName = splitName[1].trim();
                        if (locations[group] == null) {
                            locations[group] = [];
                        }
                        if (checksPerLocation[group]== null) { //creates new entries in dictionary if location wasn't present before
                            checksPerLocation[group] = 0;
                        }
                        if (accessiblePerLocation[group]== null) {
                            accessiblePerLocation[group] = 0;
                        }

                        let logicExpression = this.parseLogicExpression(doc[location].Need);
                        let finalRequirements = this.parseLogicExpressionToString(this.parseFullLogicExpression(logicExpression), 0)
                        let newLocation = {
                            localId: -1,
                            name: locationName.trim(),  
                            checked: false,
                            logicExpression: logicExpression,
                            needs: finalRequirements,
                            inLogic: this.meetsRequirements(logicExpression)
                        }
                        let id = locations[group].push(newLocation) - 1;
                        locations[group][id].localId = id;
                        ++checksPerLocation[group]; //counts how many checks are in each location
                        if (locations[group][id].inLogic) {++accessiblePerLocation[group];}
                        ++counter;
                    }
                    this.setState({locations: locations})
                    const locationGroups = [];
                    for (var group in locations) {
                        locationGroups.push(group);
                    }
                    this.setState({locationGroups: locationGroups});
                    this.setState({totalChecks: counter});
                    this.setState({checksPerLocation: checksPerLocation});
                    this.setState({accessiblePerLocation: accessiblePerLocation});
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

    isLogicSymbol(token) {
        return token !== "&" && token !== "|" && token !== "(" && token !== ")"
    }

    isMacro(macro) {
        let parsed = this.state.macros[macro];
        if (parsed === undefined) {
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
        if (requirement === "Nothing") {
            return true;
        }
        if (requirement === "(" || requirement === ")" || requirement === "&" || requirement === "|") {
            return true;
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

    itemClickedCounterUpdate()
    {
        const NewStateAccessiblePerLocation = Object.assign({}, this.state.accessiblePerLocation);
        for (let group in this.state.locations) {
            let counter = 0;
            this.state.locations[group].forEach(location => {
                if(location.inLogic && !location.checked){++counter;}
            });
            NewStateAccessiblePerLocation[group] = counter;
        }
        this.setState({accessiblePerLocation: NewStateAccessiblePerLocation});
        this.setState(prevState => ({
            itemClicked: false
        }));          
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
                }               break;
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
                }               break;
            default:
                break;
        }
        this.setState({items: newState});
        this.setState(prevState => ({
            itemClicked: true
        }));
    }

    render() {
        console.log("Rendered");
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

        console.log(this.state.locations);

        return (
            <div>
                <Container fluid>
                    <Row xs={1} sm={2} md={3}>
                        <Col xs={1}>
                            <ItemTracker
                                updateLogic={this.updateLocationLogic}
                                styleProps={itemTrackerStyle}
                                checksPerLocation={this.state.checksPerLocation}
                                accessiblePerLocation={this.state.accessiblePerLocation}
                            />
                        </Col>
                        <Col style={{overflowY: "scroll", overflowX: "auto"}}>
                            <LocationTracker className="overflowAuto" style={locationTrackerStyle}
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
                            <BasicCounters style={countersStyle}
                                totalChecks = {this.state.totalChecks}
                                totalChecksChecked = {this.state.totalChecksChecked}
                                accessiblePerLocation={this.state.accessiblePerLocation}
                                locationGroups={this.state.locationGroups}
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
