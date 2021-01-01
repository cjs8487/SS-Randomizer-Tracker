import React from 'react';
import songBlock from '../assets/Song_Block.png';

import Courage from './items/courage';
import Power from './items/power';
import Wisdom from './items/wisdom';
import Ballad from './items/ballad';
import Soth from './items/soth';
import Harp from './items/harp';

import Sailcloth from './items/sailcloth';
import Scale from './items/scale';
import Earrings from './items/earrings';
import Mitts from './items/mitts';

import Stone from './items/stone';
import EmeraldTablet from './items/emeraldTablet';
import RubyTablet from './items/rubyTablet';
import AmberTablet from './items/amberTablet';

export default class SwordBlock extends React.Component {
    render() {
        const wid = this.props.styleProps.width;

        const sailclothStyle = {
            position: 'relative',
            bottom: (wid / 1.97 + 600 / wid),
            left: wid / 13,
        };

        const earringsStyle = {
            position: 'relative',
            bottom: (wid / 4 + 600 / wid),
            left: wid / 1.75,
        };

        const scaleStyle = {
            position: 'relative',
            bottom: (wid / 3.8 + 600 / wid),
            left: wid / 4,
        };

        const mittsStyle = {
            position: 'relative',
            bottom: (wid / 1.95 + 600 / wid),
            left: wid / 1.325,
        };

        const courageStyle = {
            position: 'relative',
            bottom: (wid / 1.315 + 600 / wid),
            left: wid / 1.54,
        };

        const powerStyle = {
            position: 'relative',
            bottom: (wid / 1.78 + 600 / wid),
            left: wid / 1.775,
        };

        const wisdomStyle = {
            position: 'relative',
            bottom: (wid / 1.78 + 600 / wid),
            left: wid / 3.375,
        };

        const balladStyle = {
            position: 'relative',
            bottom: (wid / 1.315 + 600 / wid),
            left: wid / 4.7,
        };
        const sothStyle = {
            position: 'relative',
            bottom: (wid / 1.07 + 600 / wid),
            left: wid / 3.15,
        };

        const harpStyle = {
            position: 'relative',
            bottom: (wid / 1.315 + 600 / wid),
            left: wid / 2.5,
        };

        const stoneStyle = {
            position: 'relative',
            bottom: (wid / 0.809 + 600 / wid),
            left: wid / 1.8,
        };

        const emeraldTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.855 + 600 / wid),
            left: wid / 4.3,
        };

        const rubyTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.7855 + 600 / wid),
            left: wid / 6,
        };

        const amberTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.7855 + 600 / wid),
            left: wid / 13.9,
        };

        return (
            <div id="songBlock">
                <img src={songBlock} alt="" width={wid} />

                <div id="sailcloth" style={sailclothStyle}>
                    <Sailcloth current={this.props.items.sailcloth} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="earrings" style={earringsStyle}>
                    <Earrings current={this.props.items.earrings} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="scale" style={scaleStyle}>
                    <Scale current={this.props.items.scale} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="mitts" style={mittsStyle}>
                    <Mitts current={this.props.items.mitts} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>

                <div id="courage" style={courageStyle}>
                    <Courage current={this.props.items.courage} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="power" style={powerStyle}>
                    <Power current={this.props.items.power} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="wisdom" style={wisdomStyle}>
                    <Wisdom current={this.props.items.wisdom} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="ballad" style={balladStyle}>
                    <Ballad current={this.props.items.ballad} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="soth" style={sothStyle}>
                    <Soth current={this.props.items.soth} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="harp" style={harpStyle}>
                    <Harp current={this.props.items.harp} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>

                <div id="stone" style={stoneStyle}>
                    <Stone current={this.props.items.stone} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="emeraldTablet" style={emeraldTabletStyle}>
                    <EmeraldTablet current={this.props.items.emeraldTablet} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="rubyTablet" style={rubyTabletStyle}>
                    <RubyTablet current={this.props.items.rubyTablet} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="rubyTablet" style={amberTabletStyle}>
                    <AmberTablet current={this.props.items.amberTablet} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>

            </div>
        );
    }
}
