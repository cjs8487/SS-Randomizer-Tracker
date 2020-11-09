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

        this.MAX_BEETLE = 2;
        this.MAX_SLINGSHOT = 1;
        this.MAX_BOMBS = 1;
        this.MAX_GUSTBELLOWS = 1;
        this.MAX_WHIP = 1;
        this.MAX_CLAWSHOTS = 1;
        this.MAX_BOW = 1;
        this.MAX_BUGNET = 1;

        this.state = {
            items: {
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
        let wid = this.props.styleProps.width

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
                        <Beetle current={this.props.items.beetle} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"slingshot"} style={slingshotStyle}>
                        <Slingshot current={this.props.items.slingshot} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"bombs"} style={bombsStyle}>
                        <Bombs current={this.props.items.bombs} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"bugnet"} style={netStyle}>
                        <Bugnet current={this.props.items.bugnet} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"bow"} style={bowStyle}>
                        <Bow current={this.props.items.bow} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"clawshots"} style={clawshotsStyle}>
                        <Clawshots current={this.props.items.clawshots} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"whip"} style={whipStyle}>
                        <Whip current={this.props.items.whip} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                    <div id={"gustBellows"} style={gustBewllowsStyle}>
                        <GustBellows current={this.props.items.gustBellows} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                    </div>
                </div>

    }

    handleClick () {
        
    }

    handleUpdate (item) {//update handler for each item, blame cj for not commenting
        switch (item) {
            case "beetle":
                this.setState({items: this.setItemState("beetle", this.state.items.beetle < this.MAX_BEETLE ? this.state.items.beetle + 1 : 0)});
                return;
            case "slingshot":
                this.setState({items: this.setItemState("slingshot", this.state.items.slingshot < this.MAX_SLINGSHOT ? this.state.items.slingshot + 1 : 0)});
                return;
            case "bombs":
                this.setState({items: this.setItemState("bombs", this.state.items.bombs < this.MAX_BOMBS ? this.state.items.bombs + 1 : 0)});
                return;
            case "gustBellows":
                this.setState({items: this.setItemState("gustBellows", this.state.items.gustBellows < this.MAX_GUSTBELLOWS ? this.state.items.gustBellows + 1 : 0)});
                return;
            case "whip":
                this.setState({items: this.setItemState("whip", this.state.items.whip < this.MAX_WHIP ? this.state.items.whip + 1 : 0)});
                return;
            case "clawshots":
                this.setState({items: this.setItemState("clawshots", this.state.items.clawshots < this.MAX_CLAWSHOTS ? this.state.items.clawshots + 1 : 0)});
                return;
            case "bow":
                this.setState({items: this.setItemState("bow", this.state.items.bow < this.MAX_BOW ? this.state.items.bow + 1 : 0)});
                return;
            case "bugnet":
                this.setState({items: this.setItemState("bugnet", this.state.items.bugnet < this.MAX_BUGNET ? this.state.items.bugnet + 1 : 0)});
                return;    
            default:
                    return;
        }
    }

    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.items);
        newItems[item] = state;
        this.props.updateLogic(item, state);
        return newItems;
    }
}
