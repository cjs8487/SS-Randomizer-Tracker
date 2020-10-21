import React from 'react';
import inventory from '../assets/Inventory_Gear_Subscreen_Overlay.png';
import './itemTracker.css';
import Beetle from "./items/beetle";
import Slingshot from "./items/slingshot";
import Bombs from "./items/bombs";
import GustBellows from "./items/gustBellows";
import Whip from "./items/whip";
import Clawshots from "./items/clawshots";
import Bow from "./items/bow";

export default class ItemTracker extends React.Component {
    MAX_BEETLE;//constant max index for items
    MAX_SLINGSHOT;
    MAX_BOMBS;
    MAX_GUSTBELLOWS;
    MAX_WHIP;
    MAX_CLAWSHOTS;
    MAX_BOW;

    constructor() {
        super();

        this.MAX_BEETLE = 3;
        this.MAX_SLINGSHOT = 2;
        this.MAX_BOMBS = 2;
        this.MAX_GUSTBELLOWS = 2;
        this.MAX_WHIP = 2;
        this.MAX_CLAWSHOTS = 2;
        this.MAX_BOW = 2;

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
                <div id={"b-wheel"}>
                    <Beetle current={this.state.items.beetle} onChange={this.handleUpdate}/>
                    <Slingshot current={this.state.items.slingshot} onChange={this.handleUpdate}/>
                    <Bombs current={this.state.items.bombs} onChange={this.handleUpdate}/>
                    <GustBellows current={this.state.items.gustBellows} onChange={this.handleUpdate}/>
                    <Whip current={this.state.items.whip} onChange={this.handleUpdate}/>
                    <Clawshots current={this.state.items.clawshots} onChange={this.handleUpdate}/>
                    <Bow current={this.state.items.bow} onChange={this.handleUpdate}/>
                </div>
            </div>
    );}

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
