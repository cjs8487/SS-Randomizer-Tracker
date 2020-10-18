import React from 'react';
import inventory from './assets/Inventory_Gear_Subscreen_Overlay.png';
import './App.css';

class itemTracker extends React.Component {
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
                courage: 0,
                wisdom: 0,
                power: 0,
                soth: 0,
            }

        };
    }

}
