import React from 'react';
import inventory from './assets/Inventory_Gear_Subscreen_Overlay.png';
import './itemTracker.css';

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
                soth: 0,//max 3
                sword: 0,//0 for goddess, 1 for longsword, 2 for white, 3 for MS, 4 for TMS
            }

        };
    }

    render() {
        return <div id="itemTracker">
            <img src={inventory} id="itemTrackerScreen"/>
        </div>;
    }
}
