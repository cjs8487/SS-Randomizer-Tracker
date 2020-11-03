import {Form, FormCheck, FormGroup, Button, FormLabel} from "react-bootstrap";
import React from "react";
import "./options.css"

export default class Options extends React.Component {
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
                    <FormCheck type={"checkbox"} label={"Swordless"} id={"swordless"} checked={this.state.options.swordless}/>
                    <FormCheck type={"checkbox"} label={"Tablet Randomizer"} id={"trando"} checked={this.state.options.tabletRando}/>
                    <FormCheck type={"checkbox"} label={"Race Mode"} id={"racemode"} checked={this.state.options.raceMode}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Required Dungeons</FormLabel>
                </FormGroup>
                <FormGroup>
                    <FormCheck
                        type={"checkbox"}
                        inline
                        label={"Skyview Temple"}
                        id={"sv"}
                        checked={this.state.options.requiredDungeons.includes("Skyview")}
                    />
                    <FormCheck type={"checkbox"} inline label={"Earth Temple"} id={"et"}/>
                    <FormCheck type={"checkbox"} inline label={"Lanayru Mining Facility"} id={"lmf"}/>
                    <FormCheck type={"checkbox"} inline label={"Ancient Cistern"} id={"ac"}/>
                    <FormCheck type={"checkbox"} inline label={"Sandship"} id={"ss"}/>
                    <FormCheck type={"checkbox"} inline label={"Fire Sanctuary"} id={"fs"}/>
                    <FormCheck type={"checkbox"} disabled defaultChecked inline label={"Skykeep"} id={"sk"}/>
                </FormGroup>
                <Button variant="primary" onClick={this.submit()}>
                    Start Randomizer with these options
                </Button>
            </Form>
        )
    }
    
    changeBinaryOption(option) {
        let newstate = this.state.options
        newstate[option] = !this.state.options[option]
        this.setState({options: newstate})
    }
    
    constructor(props) {
        super(props);
        this.state = {
            options: {
                requiredDungeons: [],
                "swordless": false,
                "openThunderhead": false,
                "tabletRando": false,
                "raceMode": false
            }
        }
        this.changeBinaryOption = this.changeBinaryOption.bind(this)
    }
    
    submit() {
    
    };

}