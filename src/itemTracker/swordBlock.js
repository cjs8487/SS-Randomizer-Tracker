import React from 'react';
import swordBlock from '../assets/Sword_Block.png'

import Sword from "./items/sword";
import FaroresFlame from "./items/faroresFlame";
import NayrusFlame from "./items/nayrusFlame";
import DinsFlame from "./items/dinsFlame";




export default class SwordBlock extends React.Component {
    
    MAX_SWORD;

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this)

        this.MAX_SWORD = 6;

        this.state = { items: {
            sword: 0,
        },
    };
    }
    
    render() {
        let wid = this.props.style.width

        const swordStyle = {
            position: 'relative',
            bottom: (wid/.85 - 1/wid),
            left: wid/16
        }        
        
        const faroresFlameStyle = {
            position: 'relative',
            bottom: (wid/1.07 - 1/wid),
            left: wid/1.36
        }     

        const nayrusFlameStyle = {
            position: 'relative',
            bottom: (wid/1.12 - 1/wid),
            left: wid/20
        }

        const dinsFlameStyle = {
            position: 'relative',
            bottom: (wid/.69 - 1/wid),
            left: wid/2.55
        }

        return  <div id={"BWheel"}>
                    <img src={swordBlock} alt={""} width={wid}/>
                    <div id={"sword"} style={swordStyle}>
                        <Sword current={this.state.items.sword} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"faroresFlame"} style={faroresFlameStyle}>
                        <FaroresFlame current={this.state.items.sword} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                    <div id={"nayrusFlame"} style={nayrusFlameStyle}>
                        <NayrusFlame current={this.state.items.sword} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>                    
                    <div id={"dinsFlame"} style={dinsFlameStyle}>
                        <DinsFlame current={this.state.items.sword} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                </div>

    }

    handleClick () {

    }

    handleUpdate (item) {//update handler for each item, blame cj for not commenting
        switch (item) {
            case "sword":
                this.setState({items: this.setItemState("sword", this.state.items.sword < this.MAX_SWORD ? this.state.items.sword + 1 : 0)});
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
