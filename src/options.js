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
        this.changeBinaryOption = this.changeBinaryOption.bind(this)
        this.changeRequiredDungeon = this.changeRequiredDungeon.bind(this)
    }
    
    //TODO
    render() {
        return (
            <Form>
                <FormGroup>
                    <FormCheck
                        type={"checkbox"}
                        label={"Open Thunderhead"}
                        id={"oth"}
                        checked={this.state.options.openThunderhead}
                        onChange={this.changeBinaryOption.bind(this, "openThunderhead")}
                    />
                    <FormCheck
                        type={"checkbox"}
                        label={"Swordless"}
                        id={"swordless"} checked={this.state.options.swordless}
                        onChange={this.changeBinaryOption.bind(this, "swordless")}
                    />
                    <FormCheck
                        type={"checkbox"}
                        label={"Tablet Randomizer"}
                        id={"trando"}
                        checked={this.state.options.tabletRando}
                        onChange={this.changeBinaryOption.bind(this, "tabletRando")}/>
                    <FormCheck
                        type={"checkbox"}
                        label={"Race Mode"}
                        id={"racemode"}
                        checked={this.state.options.raceMode}
                        onChange={this.changeBinaryOption.bind(this, "raceMode")}
                    />
                    <FormCheck
                        type={"checkbox"}
                        label={"Skip Skykeep"}
                        id={"skipSkykeep"}
                        checked={this.state.options.skipSkykeep}
                        onChange={this.changeBinaryOption.bind(this, "skipSkykeep")}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Where should progression items appear</FormLabel>
                </FormGroup>
                <FormGroup>
                    <div>
                        <Row>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Batreaux"}
                                    id={"batreaux"}
                                    checked={!this.state.options.bannedLocations.includes("batreaux")}
                                    onChange={this.changeBannedLocation.bind(this, "batreaux")}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Goddess Cubes/Chests"}
                                    id={"goddessc"}
                                    checked={!this.state.options.bannedLocations.includes("goddessc")}
                                    onChange={this.changeBannedLocation.bind(this, "goddessc")}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Main Quest"}
                                    id={"mainquest"}
                                    checked={!this.state.options.bannedLocations.includes("mainquest")}
                                    onChange={this.changeBannedLocation.bind(this, "mainquest")}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Loose Crystals"}
                                    id={"looseCrystals"}
                                    disabled={true}
                                    checked={!this.state.options.bannedLocations.includes("looseCrystals")}
                                    onChange={this.changeBannedLocation.bind(this, "looseCrystals")}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Minigames"}
                                    id={"minigames"}
                                    checked={!this.state.options.bannedLocations.includes("minigame")}
                                    onChange={this.changeBannedLocation.bind(this, "minigame")}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Sidequests"}
                                    id={"sidequests"}
                                    checked={!this.state.options.bannedLocations.includes("sidequests")}
                                    onChange={this.changeBannedLocation.bind(this, "sidequests")}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Dungeon"}
                                    id={"dungeon"}
                                    checked={!this.state.options.bannedLocations.includes("dungeon")}
                                    onChange={this.changeBannedLocation.bind(this, "dungeon")}/>
                            </Col>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Overworld"}
                                    id={"overworld"}
                                    checked={!this.state.options.bannedLocations.includes("overworld")}
                                    onChange={this.changeBannedLocation.bind(this, "overworld")}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    inline={true}
                                    type={"checkbox"}
                                    label={"Silent Realms"}
                                    id={"skipSkykeep"}
                                    checked={!this.state.options.bannedLocations.includes("trials")}
                                    onChange={this.changeBannedLocation.bind(this, "trials")}
                                />
                            </Col>
                        </Row>
                    </div>
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
            newOptions.bannedLocations.splice(newOptions.requiredDungeons.indexOf(location), 1)
        } else {
            newOptions.bannedLocations.push(location)
        }
        this.setState({options: newOptions})
    }
    
    submit() {//lifts options state up
    
    };
    
}