import React from 'react';
import './itemTracker.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import BWheel from "./bWheel";
import SwordBlock from "./swordBlock";
import SongBlock from "./songBlock";
import DungeonTracker from './dungeonTracker';

export default class ItemTracker extends React.Component {
    MAX_BEETLE;//constant max index for items
    MAX_SLINGSHOT;
    MAX_BOMBS;
    MAX_GUSTBELLOWS;
    MAX_WHIP;
    MAX_CLAWSHOTS;
    MAX_BOW;
    MAX_BUGNET;
    MAX_SONG;
    MAX_HARP;
    MAX_NON_B;
    MAX_MITTS;

    constructor(props) {
        super(props);

        this.state = {
            width: this.props.styleProps.width,
            height: this.props.styleProps.height
        };

    }

    render() {
        //DON'T TOUCH, it works how it is
        const swordBlockOffset = 5.8
        const swordBlockOffsetHeight = 2.2
        const bWheelOffset = 3.5
        const songBlockOffset = 5.3

        const swordBlockStyle = {
            position: 'fixed',
            width: this.props.styleProps.width/2.5,
            left: 0,
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }

        const bWheelStyle = {
            position: 'fixed',
            width: 2 * this.props.styleProps.width/3,
            left: (this.props.styleProps.width/8),//don't ask, this has to be like this so the b-wheel is somewhat centered
            top: this.props.styleProps.height/2, //swordBlockStyle.height would be preferable but is not declared
            margin: "1%",
            // border: '3px solid #000000'
        }        

        const songBlockStyle = {
            position: 'fixed',
            width: this.props.styleProps.width/2.5,
            left: swordBlockStyle.width,
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }

        const dungeonTrackerStyle = {
            position: 'fixed',
            margin: "1%",
            top: bWheelStyle.top + bWheelStyle.height,
            width: 2 * this.props.styleProps.width/3,
        }

        return (
            <div id="itemTracker">
                {/* <Container fluid> */}
                   <Row>
                       <Col>
                            <div id={'swordBlock'}>
                                <SwordBlock styleProps={swordBlockStyle} items={this.props.items} updateLogic={this.props.updateLogic} handleItemClick={this.props.handleItemClick}/>
                            </div>
                        </Col>
                        <Col>
                            <div id={'songBlock'}>
                                <SongBlock styleProps={songBlockStyle}items={this.props.items} updateLogic={this.props.updateLogic} handleItemClick={this.props.handleItemClick}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div id={"bWheel"}>
                            <BWheel styleProps={bWheelStyle} updateLogic={this.props.updateLogic} handleItemClick={this.props.handleItemClick}/>
                        </div>
                    </Row>
                    <Row>
                        <div id={'dungeonTracker'}>
                            <DungeonTracker styleProps={dungeonTrackerStyle} updateLogic={this.props.updateLogic} 
                                checksPerLocation={this.props.checksPerLocation} 
                                accessiblePerLocation={this.props.accessiblePerLocation}
                            />
                        </div>
                    </Row>
                {/* </Container> */}
            </div>
        );
    }
}
                    