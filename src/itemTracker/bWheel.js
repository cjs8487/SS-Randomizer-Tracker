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
}
