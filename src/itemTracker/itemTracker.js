import React from 'react';
import './itemTracker.css';


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

        this.state = {};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    render() {
        const swordBlockOffset = 3.8
        const bWheelOffset = 2.5
        const songBlockOffset = 3.4

        const swordBlockStyle = {
            position: 'fixed',
            width: this.state.width/swordBlockOffset,
            left: 0,
            top: 0,
            // border: '3px solid #73AD21'
        }

        const bWheelStyle = {
            position: 'fixed',
            width: this.state.width/bWheelOffset,
            left: this.state.width/swordBlockOffset,
            top: 0,
            // border: '3px solid #000000'
        }        

        const songBlockStyle = {
            position: 'fixed',
            width: this.state.width/songBlockOffset,
            left: (this.state.width/swordBlockOffset + this.state.width/bWheelOffset),
            top: 0,
            // border: '3px solid #73AD21'
        }

        return (
            <div id="itemTracker">
                <div id={'swordBlock'} style={swordBlockStyle}>
                    <SwordBlock style={swordBlockStyle}/>
                </div>
                <div id={"bWheel"} style={bWheelStyle}>
                    <BWheel style={bWheelStyle} />
                </div>
                <div id={'songBlock'} style={songBlockStyle}>
                    <SongBlock style={songBlockStyle} />
                </div>
            </div>
    );}

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
