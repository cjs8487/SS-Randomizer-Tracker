import {Button, Col, Form, FormCheck, FormGroup, FormLabel, Row} from "react-bootstrap";
import React from "react";
import "./options.css"
import {Link} from "react-router-dom";

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                bannedLocations: [],
                "swordless": false,
                "openThunderhead": false,
                "tabletRando": false,
                "raceMode": false,
                "skipSkykeep": false
            }
        }
        this.regions=[
            {
                "display": "Skyloft",
                "internal": "skyloft"
            },
            {
                "display": "The Sky",
                "internal": "sky"
            },
            {
                "display": "Thunderhead",
                "internal": "thunderhead"
            },
            {
                "display": "Faron",
                "internal": "faron"
            },
            {
                "display": "Eldin",
                "internal": "eldin"
            },
            {
                "display": "Lanayru",
                "internal": "lanayru"
            },
        ]
        this.types = [
            {
                "display": "Dungeons",
                "internal": "dungeon"
            },
            {
                "display": "Mini Dungeons",
                "internal": "mini dungeon"
            },
            {
                "display": "Free Gifts",
                "internal": "free gift"
            },
            {
                "display": "Freestanding Items",
                "internal": "freestanding"
            },
            {
                "display": "Miscellaneous",
                "internal": "miscellaneous"
            },
            {
                "display": "Silent Realms",
                "internal": "lanayru"
            },
            {
                "display": "Digging Spots",
                "internal": "digging"
            },
            {
                "display": "Bombable Walls",
                "internal": "bombable"
            },
            {
                "display": "Combat Rewards",
                "internal": "combat"
            },
            {
                "display": "Songs",
                "internal": "song"
            },
            {
                "display": "Spiral Charge Chests",
                "internal": "spiral charge"
            },
            {
                "display": "Minigames",
                "internal": "minigame"
            },
            {
                "display": "Batreaux",
                "internal": "batreaux"
            },
            {
                "display": "Loose Crystals",
                "internal": "crystal"
            },
            {
                "display": "Peatrice",
                "internal": "peatrice"
            },
            {
                "display": "Short Quests",
                "internal": "short quests"
            },
            {
                "display": "Long Quests",
                "internal": "long quests"
            },
            {
                "display": "Fetch Quests",
                "internal": "fetch quests"
            },
            {
                "display": "Crystal Quests",
                "internal": "crystal quest"
            },
            {
                "display": "Scrapper Quest",
                "internal": "scrapper quest"
            },
        ]
        this.typesSplitListing = []
        for (let i = 0; i < this.types.length; i+=5) {
            this.typesSplitListing.push(this.types.slice(i, i+5))
        }
        this.changeBinaryOption = this.changeBinaryOption.bind(this)
        this.changeRequiredDungeon = this.changeRequiredDungeon.bind(this)
    }
    
    //TODO
    render() {
        return (
            <Form>
                <FormGroup>
                    <Row>
                        {this.regions.map((region) => (
                            <Col>
                                <FormCheck
                                    type={"checkbox"}
                                    label={region.display}
                                    id={region.internal}
                                    checked={!this.state.options.bannedLocations.includes(region.internal)}
                                    onChange={this.changeBannedLocation.bind(this, region.internal)}
                                />
                            </Col>
                        ))}
                    </Row>
                </FormGroup>
                <FormGroup>
                    {this.typesSplitListing.map((typeList, index) => {
                        return (
                            <Row>
                                {typeList.map(type => (
                                    <Col>
                                    <FormCheck
                                    type={"checkbox"}
                                    label={type.display}
                                    id={type.internal}
                                    checked={!this.state.options.bannedLocations.includes(type.internal)}
                                    onChange={this.changeBannedLocation.bind(this, type.internal)}
                                    disabled={type.internal==="crystal"}
                                />
                                    </Col>
                                ))}
                            </Row>
                        )
                    })}
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Open Thunderhead"}
                                id={"oth"}
                                checked={this.state.options.openThunderhead}
                                onChange={this.changeBinaryOption.bind(this, "openThunderhead")}
                            />
                        </Col>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Swordless"}
                                id={"swordless"} checked={this.state.options.swordless}
                                onChange={this.changeBinaryOption.bind(this, "swordless")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Tablet Randomizer"}
                                id={"trando"}
                                checked={this.state.options.tabletRando}
                                onChange={this.changeBinaryOption.bind(this, "tabletRando")}
                            />
                        </Col>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Race Mode"}
                                id={"racemode"}
                                checked={this.state.options.raceMode}
                                onChange={this.changeBinaryOption.bind(this, "raceMode")}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Skip Skykeep"}
                                id={"skipSkykeep"}
                                checked={this.state.options.skipSkykeep}
                                onChange={this.changeBinaryOption.bind(this, "skipSkykeep")}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <Link to={{pathname: "/tracker", search: "?options=" + JSON.stringify(this.state.options)}}>
                    <Button variant="primary" onClick={this.submit()}>
                        Start Randomizer with these options
                    </Button>
                </Link>
            
            </Form>)
        /*<FormGroup>
            <FormLabel>Required Dungeons</FormLabel>
        </FormGroup>
        <FormGroup>
            <FormCheck
                type={"checkbox"}
                inline
                label={"Skyview Temple"}
                id={"sv"}
                checked={this.state.options.requiredDungeons.includes("Skyview")}
                onChange={this.changeRequiredDungeon.bind(this, "Skyview")}
            />
            <FormCheck type={"checkbox"} inline label={"Earth Temple"} id={"et"}/>
            <FormCheck type={"checkbox"} inline label={"Lanayru Mining Facility"} id={"lmf"}/>
            <FormCheck type={"checkbox"} inline label={"Ancient Cistern"} id={"ac"}/>
            <FormCheck type={"checkbox"} inline label={"Sandship"} id={"ss"}/>
            <FormCheck type={"checkbox"} inline label={"Fire Sanctuary"} id={"fs"}/>
            <FormCheck type={"checkbox"} disabled defaultChecked inline label={"Skykeep"} id={"sk"}/>
        </FormGroup>*/
        
        
    }
    
    changeBinaryOption(option) {
        let newstate = this.state.options
        newstate[option] = !this.state.options[option]
        this.setState({options: newstate})
    }
    
    changeRequiredDungeon(dungeon) {
        let newOptions = this.state.options
        if (newOptions.requiredDungeons.includes(dungeon)) {
            newOptions.requiredDungeons.splice(newOptions.requiredDungeons.indexOf(dungeon), 1)
        } else {
            newOptions.requiredDungeons.push(dungeon)
        }
        this.setState({options: newOptions})
    }
    
    changeBannedLocation(location) {
        let newOptions = this.state.options
        if (newOptions.bannedLocations.includes(location)) {
            newOptions.bannedLocations.splice(newOptions.bannedLocations.indexOf(location), 1)
        } else {
            newOptions.bannedLocations.push(location)
        }
        this.setState({options: newOptions})
    }
    
    submit() {//lifts options state up
    
    };
    
}