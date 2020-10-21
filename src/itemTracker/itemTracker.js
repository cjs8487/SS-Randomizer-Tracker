import React from 'react';
import inventory from '../assets/Inventory_Gear_Subscreen_Overlay.png';
import './itemTracker.css';
import Beetle from "./items/beetle";
import Slingshot from "./items/slingshot";

export default class ItemTracker extends React.Component {
    MAX_BEETLE;//constant max index for items
    MAX_SLINGSHOT;

    constructor() {
        super();

        this.MAX_BEETLE = 3;
        this.MAX_SLINGSHOT = 2;

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
                <div id={"gear"}>
                    <img src={inventory} id="itemTrackerScreen" alt={"Inventory"}/>
                </div>
                <Beetle current={this.state.items.beetle} onChange={this.handleUpdate}/>
                <Slingshot current={this.state.items.slingshot} onChange={this.handleUpdate}/>
            </div>
    );}

    handleUpdate (item) {
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
