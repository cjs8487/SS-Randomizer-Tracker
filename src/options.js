import {Form, FormCheck, FormGroup, Button, FormLabel} from "react-bootstrap";
import React from "react";
import "./options.css"

export default class Options extends React.Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <FormCheck type={"checkbox"} label={"Open Thunderhead"} id={"oth"}/>
                    <FormCheck type={"checkbox"} label={"Swordless"} id={"swordless"}/>
                    <FormCheck type={"checkbox"} label={"Tablet Randomizer"} id={"trando"}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Required Dungeons</FormLabel>
                </FormGroup>
                <FormGroup>
                    <FormCheck type={"checkbox"} inline label={"Skyview Temple"} id={"sv"}/>
                    <FormCheck type={"checkbox"} inline label={"Earth Temple"} id={"et"}/>
                    <FormCheck type={"checkbox"} inline label={"Lanayru Mining Facility"} id={"lmf"}/>
                    <FormCheck type={"checkbox"} inline label={"Ancient Cistern"} id={"ac"}/>
                    <FormCheck type={"checkbox"} inline label={"Sandship"} id={"ss"}/>
                    <FormCheck type={"checkbox"} inline label={"Fire Sanctuary"} id={"fs"}/>
                    <FormCheck type={"checkbox"} disabled defaultChecked inline label={"Skykeep"} id={"sk"}/>
                </FormGroup>
                <Button variant="primary" type="submit">
                    Start Randomizer with these options
                </Button>
            </Form>
        )
    }

}