import React from 'react';
import inventory from '../assets/Inventory_Gear_Subscreen_Overlay.png';
import './itemTracker.css';
import Beetle from "./items/beetle";

export default class ItemTracker extends React.Component {
    constructor() {
        super();
        this.state = { items: {
                slingshot: 0,//slingshot is only have or not
                beetle: 0,//beetle 0 means no beetle, 1 is normal beetle, 2 is hook beetle
                bombs: 0,
                gustBellows: 0,
                whip: 0,
                clawshots: 0,
                bow: 0,
                bugnet: 0,
                mitts: 0,
                scale: 0,
                earrings: 0,
                harp: 0,
                courage: 0,
                wisdom: 0,
                power: 0,
                soth: 0,
            }

        };
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    render() {
        return (
            <div id="itemTracker">
                <img src={inventory} id="itemTrackerScreen" alt={"Inventory"}/>
                <Beetle current={this.state.items.beetle} onChange={this.handleUpdate}/>
            </div>
    );}

    handleUpdate (item) {
        switch (item) {
            case "beetle":
                this.setState((state, props) => ({
                    items: this.setItemState("beetle", state.items.beetle < 3 ? state.items.beetle++ : state.items.beetle = 0)
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
