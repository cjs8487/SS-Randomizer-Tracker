import React from 'react';
import wheel from '../assets/b wheel.png'

import Beetle from "./items/beetle";
import Slingshot from "./items/slingshot";
import Bombs from "./items/bombs";
import GustBellows from "./items/gustBellows";
import Whip from "./items/whip";
import Clawshots from "./items/clawshots";
import Bow from "./items/bow";
import Bugnet from "./items/bugnet";



export default class BWheel extends React.Component {
    MAX_BEETLE;//constant max index for items
    MAX_SLINGSHOT;
    MAX_BOMBS;
    MAX_GUSTBELLOWS;
    MAX_WHIP;
    MAX_CLAWSHOTS;
    MAX_BOW;
    MAX_BUGNET;

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this)

        this.MAX_BEETLE = 3;
        this.MAX_SLINGSHOT = 2;
        this.MAX_BOMBS = 2;
        this.MAX_GUSTBELLOWS = 2;
        this.MAX_WHIP = 2;
        this.MAX_CLAWSHOTS = 2;
        this.MAX_BOW = 2;
        this.MAX_BUGNET = 2;

        this.state = { items: {
            slingshot: 0,//slingshot is only have or not
            beetle: 0,//beetle 0 means no beetle, 1 is normal beetle, 2 is hook beetle
            bombs: 0,
            gustBellows: 0,
            whip: 0,
            clawshots: 0,
            bow: 0,
            bugnet: 0,
        },
    };
    }

    render() {
        let wid = this.props.style.width

        const beetleStyle = {
            position: 'relative',
            bottom: (wid/1.75 + 600/wid),
            left: wid/1.33
        }

        const slingshotStyle = {
            position: 'relative',
            bottom: (wid/3.85 + 600/wid),
            left: wid/2.3
        }

        const bombsStyle = {
            position: 'relative',
            bottom: (wid/1.22 + 600/wid),
            left: wid/1.51
        }

        const netStyle = {
            position: 'relative',
            bottom: (wid/2.9 + 600/wid),
            left: wid/1.51
        }        
        
        const bowStyle = {
            position: 'relative',
            bottom: (wid/1.09 + 600/wid),
            left: wid/2.4
        }

        const clawshotsStyle = {
            position: 'relative',
            bottom: (wid/2.9 + 600/wid),
            left: wid/6.8
        }

        const whipStyle = {
            position: 'relative',
            bottom: (wid/1.75 + 600/wid),
            left: wid/13
        }

        const gustBewllowsStyle = {
            position: 'relative',
            bottom: (wid/1.22 + 600/wid),
            left: wid/6
        }


        return  <div id={"BWheel"}>
                    <img src={wheel} alt={""} width={wid}/>
                    <div id={"beetle"} style={beetleStyle}>
                        <Beetle current={this.state.items.beetle} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"slingshot"} style={slingshotStyle}>
                        <Slingshot current={this.state.items.slingshot} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"bombs"} style={bombsStyle}>
                        <Bombs current={this.state.items.bombs} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"bugnet"} style={netStyle}>
                        <Bugnet current={this.state.items.bugnet} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"bow"} style={bowStyle}>
                        <Bow current={this.state.items.bow} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"clawshots"} style={clawshotsStyle}>
                        <Clawshots current={this.state.items.clawshots} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"whip"} style={whipStyle}>
                        <Whip current={this.state.items.whip} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"gustBellows"} style={gustBewllowsStyle}>
                        <GustBellows current={this.state.items.gustBellows} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                </div>

    }

    handleClick () {

    }

    handleUpdate (item) {//update handler for each item, blame cj for not commenting
        switch (item) {
            case "beetle":
                this.setState((state, props) => ({
                    items: this.setItemState("beetle", state.items.beetle < this.MAX_BEETLE ? state.items.beetle++ : state.items.beetle = 0)
                }));
                return;
            case "slingshot":
                this.setState((state, props) => ({
                    items: this.setItemState("slingshot", state.items.slingshot < this.MAX_SLINGSHOT ? state.items.slingshot++ : state.items.slingshot = 0)
                }));
                return;
            case "bombs":
                this.setState((state, props) => ({
                    items: this.setItemState("bombs", state.items.bombs < this.MAX_BOMBS ? state.items.bombs++ : state.items.bombs = 0)
            }));
                return;
            case "gustBellows":
                this.setState((state, props) => ({
                    items: this.setItemState("gustBellows", state.items.gustBellows < this.MAX_GUSTBELLOWS ? state.items.gustBellows++ : state.items.gustBellows = 0)
                }));
                return;
            case "whip":
                this.setState((state, props) => ({
                    items: this.setItemState("whip", state.items.whip < this.MAX_WHIP ? state.items.whip++ : state.items.whip = 0)
                }));
                return;
            case "clawshots":
                this.setState((state, props) => ({
                    items: this.setItemState("clawshots", state.items.clawshots < this.MAX_CLAWSHOTS ? state.items.clawshots++ : state.items.clawshots = 0)
                }));
                return;
            case "bow":
                this.setState((state, props) => ({
                    items: this.setItemState("bow", state.items.bow < this.MAX_BOW ? state.items.bow++ : state.items.bow = 0)
                }));
                return;
            case "bugnet":
                this.setState((state, props) => ({
                    items: this.setItemState("bugnet", state.items.bugnet < this.MAX_BUGNET ? state.items.bugnet++ : state.items.bugnet = 0)
                }));
                return;    
            default:
                    return;
        }
    }

    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.items);
        newItems[item] = state;
        return newItems;
    }
}
