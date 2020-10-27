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

    constructor(props) {
        super(props);

        this.state = {
            width: this.props.style.width,
            height: this.props.style.height
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
            width: this.state.width/2.2,
            left: 0,
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }

        const bWheelStyle = {
            position: 'fixed',
            width: 2 * this.state.width/3,
            left: (this.state.width/8),//don't ask, this has to be like this so the b-wheel is somewhat centered
            top: this.state.height/2, //swordBlockStyle.height would be preferable but is not declared
            margin: "1%",
            // border: '3px solid #000000'
        }        

        const songBlockStyle = {
            position: 'fixed',
            width: this.state.width/2,
            left: swordBlockStyle.width,
            top: 0,
            margin: "1%",
            // border: '3px solid #73AD21'
        }

        return (
            <div id="itemTracker">
                <Container>
                    <Row>
                        <div id={'swordBlock'} style={swordBlockStyle}>
                            <SwordBlock style={swordBlockStyle}/>
                        </div>
                    </Row>
                    <Row>
                        <div id={"bWheel"} style={bWheelStyle}>
                            <BWheel style={bWheelStyle} />
                        </div>
                    </Row>
                    <Row>
                        <div id={'songBlock'} style={songBlockStyle}>
                            <SongBlock style={songBlockStyle} />
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}
