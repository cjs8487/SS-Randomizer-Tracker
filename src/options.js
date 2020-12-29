import {Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row} from "react-bootstrap";
import React from "react";
import "./options.css"
import {Link} from "react-router-dom";

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                bannedLocations: [],
                "entrancesRandomized": "None",
                "swordless": false,
                "closed-thunderhead": false,
                "startingTablets": 3,
                "raceMode": false,
                "skipSkykeep": false,
                "hero-mode": true
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
                "internal": "silent realm"
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
        this.cubeOptions = [
            {
                "display": "Faron Woods",
                "internal": "faron goddess"
            },
            {
                "display": "Eldin Volcano",
                "internal": "eldin goddess"
            },
            {
                "display": "Lanayru Desert",
                "internal": "lanayru goddess"
            },
            {
                "display": "Lake Floria",
                "internal": "floria goddess"
            },
            {
                "display": "Volcano Summit",
                "internal": "summit goddess"
            },
            {
                "display": "Sand Sea",
                "internal": "sand sea goddess"
            },
        ]
        this.cubesSplitListing = []
        for (let i = 0; i < this.cubeOptions.length; i+=3) {
            this.cubesSplitListing.push(this.cubeOptions.slice(i, i+3))
        }
        this.changeBinaryOption = this.changeBinaryOption.bind(this)
        this.changeRequiredDungeon = this.changeRequiredDungeon.bind(this)
        this.changeStartingTablets = this.changeStartingTablets.bind(this)
        this.changeEntranceRando = this.changeEntranceRando.bind(this)
    }
    
    //TODO
    render() {
        return (
            <Form>
                <FormGroup as="fieldset">
                <legend>Regions</legend>
                <Row>
                        {this.regions.map((region) => (
                            <Col>
                                <FormCheck
                                    type="checkbox"
                                    label={region.display}
                                    id={region.internal}
                                    checked={!this.state.options.bannedLocations.includes(region.internal)}
                                    onChange={this.changeBannedLocation.bind(this, region.internal)}
                                />
                            </Col>
                        ))}
                    </Row>
                </FormGroup>
                <FormGroup as="fieldset">
                    <legend>Progress Item Locations</legend>
                    {this.typesSplitListing.map((typeList, index) => {
                        return (
                            <Row>
                                {typeList.map(type => (
                                    <Col>
                                        <FormCheck
                                            type="checkbox"
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
                <FormGroup as="fieldset">
                    <legend>Goddess Cubes</legend>
                    <Row>
                        <Col>
                            <FormCheck
                                type="checkbox"
                                label="Enabled"
                                id="goodess"
                                checked={!this.state.options.bannedLocations.includes("goddess")}
                                onChange={this.changeBannedLocation.bind(this, "goddess")}
                            />
                        </Col>
                    </Row>
                    {this.cubesSplitListing.map(optionList => (
                        <Row>
                            {optionList.map(option => (
                                <Col>
                                    <FormCheck
                                        type={"checkbox"}
                                        label={option.display}
                                        id={option.internal}
                                        checked={!this.state.options.bannedLocations.includes(option.internal)}
                                        onChange={this.changeBannedLocation.bind(this, option.internal)}
                                        disabled={this.state.options.bannedLocations.includes("goddess")}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ))}
                </FormGroup>
                <FormGroup as="fieldset">
                    <legend>Additional Randomization</legend>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <FormLabel htmlFor="entranceRandoOptions">Randomize Entrances</FormLabel>
                                    </Col>
                                    <Col>
                                        <FormControl
                                        as="select"
                                        id="entranceRandoOptions"
                                        onChange={this.changeEntranceRando}
                                        value={this.state.options.entrancesRandomized}
                                        custom
                                        >
                                            <option>None</option>
                                            <option>Dungeons</option>
                                            <option>Dungeons + Sky Keep</option>
                                        </FormControl>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormCheck
                                type={"checkbox"}
                                label={"Swordless"}
                                id={"swordless"} checked={this.state.options.swordless}
                                onChange={this.changeBinaryOption.bind(this, "swordless")}
                            />
                        </Col>
                        <Col>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <FormControl
                                            as="select" 
                                            id="startingTabletCounter"
                                            onChange={this.changeStartingTablets}
                                            value={this.state.options.startingTablets}
                                            custom
                                        >
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </FormControl>
                                    </Col>
                                    <Col>
                                        <FormLabel htmlFor="startingTabletCounter">Starting Tablets</FormLabel>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Race Mode"}
                                id={"racemode"}
                                checked={this.state.options.raceMode}
                                onChange={this.changeBinaryOption.bind(this, "raceMode")}
                            />
                        </Col>
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Closed Thunderhead"}
                                id={"oth"}
                                checked={this.state.options["closed-thunderhead"]}
                                onChange={this.changeBinaryOption.bind(this, "closed-thunderhead")}
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
                        <Col>
                            <FormCheck
                                type={"checkbox"}
                                label={"Hero Mode"}
                                id={"hero-mode"}
                                checked={this.state.options["hero-mode"]}
                                onChange={this.changeBinaryOption.bind(this, "hero-mode")}
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

    changeStartingTablets(e) {
        console.log(e.target.value)
        let value = e.target.value;
        let newOptions = this.state.options;
        newOptions.startingTablets = value;
        this.setState(newOptions)
    }

    changeEntranceRando(e) {
        console.log(e.target.value)
        let value = e.target.value;
        let newOptions = this.state.options;
        newOptions.entrancesRandomized = value;
        this.setState(newOptions)
    }
    
    submit() {//lifts options state up
    
    };
    
}