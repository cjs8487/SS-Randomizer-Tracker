import React from 'react';
import swordBlock from '../assets/Sword_Block.png';

import Sword from './items/sword';
import FaroresFlame from './items/faroresFlame';
import NayrusFlame from './items/nayrusFlame';
import DinsFlame from './items/dinsFlame';

export default class SwordBlock extends React.Component {
    render() {
        const wid = this.props.styleProps.width;

        const swordStyle = {
            position: 'relative',
            bottom: (wid / 0.85 - 1 / wid),
            left: wid / 16,
        };

        const faroresFlameStyle = {
            position: 'relative',
            bottom: (wid / 1.07 - 1 / wid),
            left: wid / 1.36,
        };

        const nayrusFlameStyle = {
            position: 'relative',
            bottom: (wid / 1.12 - 1 / wid),
            left: wid / 20,
        };

        const dinsFlameStyle = {
            position: 'relative',
            bottom: (wid / 0.69 - 1 / wid),
            left: wid / 2.55,
        };

        return (
            <div id="BWheel">
                <img src={swordBlock} alt="" width={wid} />
                <div id="sword" style={swordStyle}>
                    <Sword current={this.props.items.sword} parent={this.props.styleProps} onChange={this.props.handleItemClick} handleItemClick={this.props.handleItemClick} />
                </div>
                <div id="faroresFlame" style={faroresFlameStyle}>
                    <FaroresFlame current={this.props.items.sword} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="nayrusFlame" style={nayrusFlameStyle}>
                    <NayrusFlame current={this.props.items.sword} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
                <div id="dinsFlame" style={dinsFlameStyle}>
                    <DinsFlame current={this.props.items.sword} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
                </div>
            </div>
        );
    }
}
