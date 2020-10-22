import React from 'react';
import swordBlock from '../assets/Sword_Block.png'

import GustBellows from "./items/gustBellows";




export default class SwordBlock extends React.Component {
    
    MAX_GUSTBELLOWS;

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this)

        this.MAX_GUSTBELLOWS = 2;

        this.state = { items: {
            gustBellows: 0,
        },
    };
    }
    

    
    render() {
        let wid = this.props.style.width

        const gustBewllowsStyle = {
            position: 'relative',
            bottom: (wid/1.22 - 1/wid),
            left: wid/6
        }

        return  <div id={"BWheel"}>
                    <img src={swordBlock} alt={""} width={wid}/>
                    <div id={"gustBellows"} style={gustBewllowsStyle}>
                        <GustBellows current={this.state.items.gustBellows} parent={this.props.style} onChange={this.handleUpdate}/>
                    </div>
                </div>

    }

    handleClick () {

    }

    handleUpdate (item) {//update handler for each item, blame cj for not commenting
        switch (item) {
            case "gustBellows":
                this.setState((state, props) => ({
                    items: this.setItemState("gustBellows", state.items.gustBellows < this.MAX_GUSTBELLOWS ? state.items.gustBellows++ : state.items.gustBellows = 0)
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
