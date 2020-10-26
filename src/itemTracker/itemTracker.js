import React from 'react';
import './itemTracker.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import BWheel from "./bWheel";
import SwordBlock from "./swordBlock";
import SongBlock from "./songBlock";

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

    constructor() {
        super();

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    render() {
        //DON'T TOUCH, it works how it is
        const swordBlockOffset = 5.8
        const swordBlockOffsetHeight = 2.2
        const bWheelOffset = 3.5
        const songBlockOffset = 5.3
        const bWheelPositionOffset = "3%"

        const swordBlockStyle = {
            position: 'fixed',
            width: this.state.width/swordBlockOffset,
            left: 0,
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }

        const bWheelStyle = {
            position: 'fixed',
            width: this.state.width/bWheelOffset,
            left: bWheelPositionOffset,
            top: this.state.height/swordBlockOffsetHeight,
            margin: "1%",
            // border: '3px solid #000000'
        }        

        const songBlockStyle = {
            position: 'fixed',
            width: this.state.width/songBlockOffset,
            left: (this.state.width/swordBlockOffset),
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }

        return (
            <div id="itemTracker">
                <Container>
                    <Row>
                        <div id={'swordBlock'} style={swordBlockStyle}>
                            <SwordBlock style={swordBlockStyle} updateLogic={this.props.updateLogic}/>
                        </div>
                    </Row>
                    <Row>
                        <div id={"bWheel"} style={bWheelStyle}>
                            <BWheel style={bWheelStyle} updateLogic={this.props.updateLogic} />
                        </div>
                    </Row>
                    <Row>
                        <div id={'songBlock'} style={songBlockStyle}>
                            <SongBlock style={songBlockStyle} updateLogic={this.props.updateLogic} />
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
}
