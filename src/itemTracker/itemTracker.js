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
import Bugnet from "./items/bugnet";
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

        this.MAX_BEETLE = 3;
        this.MAX_SLINGSHOT = 2;
        this.MAX_BOMBS = 2;
        this.MAX_GUSTBELLOWS = 2;
        this.MAX_WHIP = 2;
        this.MAX_CLAWSHOTS = 2;
        this.MAX_BOW = 2;
        this.MAX_BUGNET = 2;
        this.MAX_SONG = 2;
        this.MAX_HARP = 2;
        this.MAX_NON_B = 2;
        this.MAX_MITTS = 3;

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
                ballad: 0,
                soth: 0,
                sailcloth: 0,
                stone: 0,
            },
            width: 0,
            height: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    render() {
        return (
            <div id="itemTracker">
                <div id={"gear"}>
                    <img src={inventory} id="itemTrackerScreen" alt={"Inventory"} width={this.state.width} height={this.state.height}/>
                    {/* <text>
                        {this.state.items.stone}
                    </text> */}
                </div>
                <div id={"b-wheel"}>
                    <Beetle current={this.state.items.beetle} onChange={this.handleUpdate}/>
                    <Slingshot current={this.state.items.slingshot} onChange={this.handleUpdate}/>
                    <Bombs current={this.state.items.bombs} onChange={this.handleUpdate}/>
                    <GustBellows current={this.state.items.gustBellows} onChange={this.handleUpdate}/>
                    <Whip current={this.state.items.whip} onChange={this.handleUpdate}/>
                    <Clawshots current={this.state.items.clawshots} onChange={this.handleUpdate}/>
                    <Bow current={this.state.items.bow} onChange={this.handleUpdate}/>
                    <Bugnet current={this.state.items.bugnet} onChange={this.handleUpdate}/>
                </div>

                <div id={"songs"}>
                    <Courage current={this.state.items.courage} onChange={this.handleUpdate}/>
                    <Power current={this.state.items.power} onChange={this.handleUpdate}/>
                    <Wisdom current={this.state.items.wisdom} onChange={this.handleUpdate}/>
                    <Ballad current={this.state.items.ballad} onChange={this.handleUpdate}/>
                    <Soth current={this.state.items.soth} onChange={this.handleUpdate}/>
                    <Harp current={this.state.items.harp} onChange={this.handleUpdate}/>
                </div>

                <div id={"non b-items"}>
                    <Sailcloth current={this.state.items.sailcloth} onChange={this.handleUpdate}/>
                    <Scale current={this.state.items.scale} onChange={this.handleUpdate}/>
                    <Earrings current={this.state.items.earrings} onChange={this.handleUpdate}/>
                    <Mitts current={this.state.items.mitts} onChange={this.handleUpdate}/>
                    <Stone current={this.state.items.stone} onChange={this.handleUpdate}/>
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
            case "bugnet":
                this.setState((state, props) => ({
                    items: this.setItemState("bugnet", state.items.bugnet < this.MAX_BUGNET ? state.items.bugnet++ : state.items.bugnet = 0)
                }));
                return;

            // Songs
            case "courage":
                this.setState((state, props) => ({
                    items: this.setItemState("courage", state.items.courage < this.MAX_SONG ? state.items.courage++ : state.items.courage = 0)
                }));
                return;
            case "power":
                this.setState((state, props) => ({
                    items: this.setItemState("power", state.items.power < this.MAX_SONG ? state.items.power++ : state.items.power = 0)
                }));
                return;
            case "wisdom":
                this.setState((state, props) => ({
                    items: this.setItemState("wisdom", state.items.wisdom < this.MAX_SONG ? state.items.wisdom++ : state.items.wisdom = 0)
                }));
                return;
            case "ballad":
                this.setState((state, props) => ({
                    items: this.setItemState("ballad", state.items.ballad < this.MAX_SONG ? state.items.ballad++ : state.items.ballad = 0)
                }));
                return;
            case "soth":
            this.setState((state, props) => ({
                items: this.setItemState("soth", state.items.soth < this.MAX_SONG ? state.items.soth++ : state.items.soth = 0)
            }));
                return;
            case "harp":
                this.setState((state, props) => ({
                    items: this.setItemState("harp", state.items.harp < this.MAX_HARP ? state.items.harp++ : state.items.harp = 0)
                }));
                return;
            
            // Non B Items
            case "sailcloth":
                this.setState((state, props) => ({
                    items: this.setItemState("sailcloth", state.items.sailcloth < this.MAX_NON_B ? state.items.sailcloth++ : state.items.sailcloth = 0)
                }));
                return;
            case "scale":
                this.setState((state, props) => ({
                    items: this.setItemState("scale", state.items.scale < this.MAX_NON_B ? state.items.scale++ : state.items.scale = 0)
                }));
                return;
            case "earrings":
                this.setState((state, props) => ({
                    items: this.setItemState("earrings", state.items.earrings < this.MAX_NON_B ? state.items.earrings++ : state.items.earrings = 0)
                }));
                return;
            case "mitts":
                this.setState((state, props) => ({
                    items: this.setItemState("mitts", state.items.mitts < this.MAX_MITTS ? state.items.mitts++ : state.items.mitts = 0)
                }));
                return;
            case "stone":
                this.setState((state, props) => ({
                    items: this.setItemState("stone", state.items.stone < this.MAX_NON_B ? state.items.stone++ : state.items.stone = 0)
                }));
                return;
            
            default:
                return;
        }
    }

    //copies current state to modify the given item within it. Sets the item value to be the provided state
    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.items);
        newItems[item] = state;
        return newItems;
    }

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
