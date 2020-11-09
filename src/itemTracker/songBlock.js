import React from 'react';
import songBlock from '../assets/Song_Block.png'

import Courage from "./items/courage";
import Power from "./items/power";
import Wisdom from "./items/wisdom";
import Ballad from "./items/ballad";
import Soth from "./items/soth";
import Harp from "./items/harp";

import Sailcloth from "./items/sailcloth";
import Scale from "./items/scale";
import Earrings from "./items/earrings";
import Mitts from "./items/mitts";

import Stone from "./items/stone";
import EmeraldTablet from "./items/emeraldTablet"
import RubyTablet from "./items/rubyTablet"
import AmberTablet from "./items/amberTablet"

export default class SwordBlock extends React.Component {
    
    MAX_GUSTBELLOWS;
    MAX_SONG;
    MAX_HARP;
    MAX_NON_B;
    MAX_MITTS;


    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this)

        this.max = {
            gustBellows: 1,
            mitts: 2,
            scale: 1,
            earrings: 1,
            harp: 1,
            courage: 1,
            wisdom: 1,
            power: 1,
            ballad: 1,
            soth: 4,
            sailcloth: 1,
            stone: 1,
            emeraldTablet: 1,
            rubyTablet: 1,
            amberTablet: 1,

        }

        this.MAX_GUSTBELLOWS = 1;
        this.MAX_SONG = 1;
        this.MAX_SOTH = 3;
        this.MAX_HARP = 1;
        this.MAX_NON_B = 1;
        this.MAX_MITTS = 2;

        this.state = { items: {
            gustBellows: 0,
            mitts: 0,
            scale: 0,
            earrings: 0,
            harp: 0,
            courage: 0,
            wisdom: 0,
            power: 0,
            ballad: 0,
            soth: 0,
            sailcloth: 0,
            stone: 0,
            emeraldTablet: 0,
            rubyTablet: 0,
            amberTablet: 0,
        },
    };
    }
    

    
    render() {
        let wid = this.props.styleProps.width

        const sailclothStyle = {
            position: 'relative',
            bottom: (wid/1.97 + 600/wid),
            left: wid/13
        }

        const earringsStyle = {
            position: 'relative',
            bottom: (wid/4 + 600/wid),
            left: wid/1.75
        }        
        
        const scaleStyle = {
            position: 'relative',
            bottom: (wid/3.8 + 600/wid),
            left: wid/4
        }

        const mittsStyle = {
            position: 'relative',
            bottom: (wid/1.95 + 600/wid),
            left: wid/1.325
        }

        const courageStyle = {
            position: 'relative',
            bottom: (wid/1.315 + 600/wid),
            left: wid/1.54
        }

        const powerStyle = {
            position: 'relative',
            bottom: (wid/1.78 + 600/wid),
            left: wid/1.775
        }

        const wisdomStyle = {
            position: 'relative',
            bottom: (wid/1.78 + 600/wid),
            left: wid/3.375
        }        

        const balladStyle = {
            position: 'relative',
            bottom: (wid/1.315 + 600/wid),
            left: wid/4.7
        }  
        const sothStyle = {
            position: 'relative',
            bottom: (wid/1.07 + 600/wid),
            left: wid/3.15
        }  

        const harpStyle = {
            position: 'relative',
            bottom: (wid/1.315 + 600/wid),
            left: wid/2.5
        }  

        const stoneStyle = {
            position: 'relative',
            bottom: (wid/0.809 + 600/wid),
            left: wid/1.8
        } 

        const emeraldTabletStyle = {
            position: 'relative',
            bottom: (wid/0.855 + 600/wid),
            left: wid/4.3
        }  

        const rubyTabletStyle = {
            position: 'relative',
            bottom: (wid/0.7855 + 600/wid),
            left: wid/6
        }  

        const amberTabletStyle = {
            position: 'relative',
            bottom: (wid/0.7855 + 600/wid),
            left: wid/13.9
        }  

        return  <div id={"songBlock"}>
                    <img src={songBlock} alt={""} width={wid}/>

                    <div id={"sailcloth"} style={sailclothStyle}>
                        <Sailcloth current={this.state.items.sailcloth} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"earrings"} style={earringsStyle}>
                        <Earrings current={this.state.items.earrings} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>                    
                    <div id={"scale"} style={scaleStyle}>
                        <Scale current={this.state.items.scale} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>                    
                    <div id={"mitts"} style={mittsStyle}>
                        <Mitts current={this.state.items.mitts} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>



                    <div id={"courage"} style={courageStyle}>
                        <Courage current={this.state.items.courage} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"power"} style={powerStyle}>
                        <Power current={this.state.items.power} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"wisdom"} style={wisdomStyle}>
                        <Wisdom current={this.state.items.wisdom} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"ballad"} style={balladStyle}>
                        <Ballad current={this.state.items.ballad} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"soth"} style={sothStyle}>
                        <Soth current={this.state.items.soth} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"harp"} style={harpStyle}>
                        <Harp current={this.state.items.harp} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>


                    <div id={"stone"} style={stoneStyle}>
                        <Stone current={this.state.items.stone} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>                    
                    <div id={"emeraldTablet"} style={emeraldTabletStyle}>
                        <EmeraldTablet current={this.state.items.emeraldTablet} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"rubyTablet"} style={rubyTabletStyle}>
                        <RubyTablet current={this.state.items.rubyTablet} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>
                    <div id={"rubyTablet"} style={amberTabletStyle}>
                        <AmberTablet current={this.state.items.amberTablet} parent={this.props.styleProps} onChange={this.handleUpdate} handleItemClick={this.props.handleItemClick}/>
                    </div>

 
                </div>

    }

    handleClick () {

    }

    handleUpdate (item) {//update handler for each item, blame cj for not commenting
        // switch (item) {
        //     case "courage":
        //         this.setState({items: this.setItemState("courage", this.state.items.courage < this.MAX_SONG ? this.state.items.courage + 1 : 0)});
        //         return;
        //     case "power":
        //         this.setState({items: this.setItemState("power", this.state.items.power < this.MAX_SONG ? this.state.items.power + 1 : 0)});
        //         return;
        //     case "wisdom":
        //         this.setState({items: this.setItemState("wisdom", this.state.items.wisdom < this.MAX_SONG ? this.state.items.wisdom + 1 : 0)});
        //         return;
        //     case "ballad":
        //         this.setState({items: this.setItemState("ballad", this.state.items.ballad < this.MAX_SONG ? this.state.items.ballad + 1 : 0)});
        //         return;
        //     case "soth":
        //         this.setState({items: this.setItemState("soth", this.state.items.soth < this.MAX_SOTH ? this.state.items.soth + 1 : 0)});
        //         return;
        //     case "harp":
        //         this.setState({items: this.setItemState("harp", this.state.items.harp < this.MAX_HARP ? this.state.items.harp + 1 : 0)});
        //         return;

        //     // Non B Items
        //     case "sailcloth":
        //         this.setState({items: this.setItemState("sailcloth", this.state.items.sailcloth < this.MAX_NON_B ? this.state.items.sailcloth + 1 : 0)});
        //         return;
        //     case "scale":
        //         this.setState({items: this.setItemState("scale", this.state.items.scale < this.MAX_NON_B ? this.state.items.scale + 1 : 0)});
        //         return;
        //     case "earrings":
        //         this.setState({items: this.setItemState("earrings", this.state.items.earrings < this.MAX_NON_B ? this.state.items.earrings + 1 : 0)});
        //         return;
        //     case "mitts":
        //         this.setState({items: this.setItemState("mitts", this.state.items.mitts < this.MAX_MITTS ? this.state.items.mitts + 1 : 0)});
        //         return;

        //     // Other
        //     case "stone":
        //         this.setState({items: this.setItemState("stone", this.state.items.stone < this.MAX_NON_B ? this.state.items.stone + 1 : 0)});
        //         return;            
        //     case "emeraldTablet":
        //         this.setState({items: this.setItemState("emeraldTablet", this.state.items.emeraldTablet < this.MAX_NON_B ? this.state.items.emeraldTablet + 1 : 0)});
        //         return;
        //     case "rubyTablet":
        //         this.setState({items: this.setItemState("rubyTablet", this.state.items.rubyTablet < this.MAX_NON_B ? this.state.items.rubyTablet +1 : 0)});
        //         return;
        //     case "amberTablet":
        //         this.setState({items: this.setItemState("amberTablet", this.state.items.amberTablet < this.MAX_NON_B ? this.state.items.amberTablet+ 1 : 0)});
        //         return;

        //     default:
        //         return;
        // }
        this.setState({items: this.setItemState(item, this.state.items[item] < this.max[item] ? this.state.items[item] + 1 : 0)})
    }

    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.items);
        newItems[item] = state;
        this.props.updateLogic(item, state)
        return newItems;
    }
}
