import React from 'react';
import PropTypes from 'prop-types';
import songBlock from '../assets/Song_Block.png';

import Item from './Item';
import Logic from '../logic/Logic';

class SongBlock extends React.Component {
    render() {
        const wid = this.props.styleProps.width;

        const sailclothStyle = {
            position: 'relative',
            bottom: (wid / 2.02 + 300 / wid),
            left: wid / 13.5,
        };

        const earringsStyle = {
            position: 'relative',
            bottom: (wid / 4.15 + 300 / wid),
            left: wid / 1.75,
        };

        const scaleStyle = {
            position: 'relative',
            bottom: (wid / 3.9 + 100 / wid),
            left: wid / 4,
        };

        const mittsStyle = {
            position: 'relative',
            bottom: (wid / 2 + 400 / wid),
            left: wid / 1.325,
        };

        const courageStyle = {
            position: 'relative',
            bottom: (wid / 1.34 + 600 / wid),
            left: wid / 1.54,
        };

        const powerStyle = {
            position: 'relative',
            bottom: (wid / 1.82 + 600 / wid),
            left: wid / 1.775,
        };

        const wisdomStyle = {
            position: 'relative',
            bottom: (wid / 1.82 + 600 / wid),
            left: wid / 3.375,
        };

        const balladStyle = {
            position: 'relative',
            bottom: (wid / 1.34 + 600 / wid),
            left: wid / 4.7,
        };
        const sothStyle = {
            position: 'relative',
            bottom: (wid / 1.081 + 140 / wid),
            left: wid / 3.15,
        };

        const harpStyle = {
            position: 'relative',
            bottom: (wid / 1.34 + 300 / wid),
            left: wid / 2.52,
        };

        const triforceStyle = {
            position: 'relative',
            bottom: (wid / 0.770 + 300 / wid),
            left: wid / 1.85,
        };

        const emeraldTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.858 + 200 / wid),
            left: wid / 4.3,
        };

        const rubyTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.8 + 1000 / wid),
            left: wid / 6.2,
        };

        const amberTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.7855 + 0 / wid),
            left: wid / 13.9,
        };

        const harpWidth = this.props.styleProps.width / 4.6;
        const botgWidth = this.props.styleProps.width / 7;
        const courageWidth = this.props.styleProps.width / 7;
        const wisdomWidth = this.props.styleProps.width / 7;
        const powerWidth = this.props.styleProps.width / 7;
        const sothWidth = this.props.styleProps.width / 2.62;
        const sailclothWidth = this.props.styleProps.width / 5.2;
        const scaleWidth = this.props.styleProps.width / 5.2;
        const earringsWidth = this.props.styleProps.width / 5.2;
        const mittsWidth = this.props.styleProps.width / 5.2;
        const triforceWidth = this.props.styleProps.width / 2.3;
        const emeraldWidth = this.props.styleProps.width / 5.2;
        const rubyWidth = this.props.styleProps.width / 3.85;
        const amberWidth = this.props.styleProps.width / 5.57;

        return (
            <div id="songBlock">
                <img src={songBlock} alt="" width={wid} />

                <div id="sailcloth" style={sailclothStyle}>
                    <Item itemName="Sailcloth" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={sailclothWidth} />
                </div>
                <div id="earrings" style={earringsStyle}>
                    <Item itemName="Fireshield Earrings" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={earringsWidth} />
                </div>
                <div id="scale" style={scaleStyle}>
                    <Item itemName="Water Dragon's Scale" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={scaleWidth} />
                </div>
                <div id="mitts" style={mittsStyle}>
                    <Item itemName="Progressive Mitts" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={mittsWidth} />
                </div>
                <div id="courage" style={courageStyle}>
                    <Item itemName="Farore's Courage" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={courageWidth} />
                </div>
                <div id="power" style={powerStyle}>
                    <Item itemName="Din's Power" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={powerWidth} />
                </div>
                <div id="wisdom" style={wisdomStyle}>
                    <Item itemName="Nayru's Wisdom" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={wisdomWidth} />
                </div>
                <div id="ballad" style={balladStyle}>
                    <Item itemName="Ballad of the Goddess" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={botgWidth} />
                </div>
                <div id="soth" style={sothStyle}>
                    <Item itemName="Song of the Hero" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={sothWidth} />
                </div>
                <div id="harp" style={harpStyle}>
                    <Item itemName="Goddess's Harp" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={harpWidth} />
                </div>

                <div id="triforce" style={triforceStyle}>
                    <Item itemName="Triforce" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={triforceWidth} />
                </div>
                <div id="emeraldTablet" style={emeraldTabletStyle}>
                    <Item itemName="Emerald Tablet" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={emeraldWidth} />
                </div>
                <div id="rubyTablet" style={rubyTabletStyle}>
                    <Item itemName="Ruby Tablet" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={rubyWidth} />
                </div>
                <div id="amberTablet" style={amberTabletStyle}>
                    <Item itemName="Amber Tablet" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={amberWidth} />
                </div>
            </div>
        );
    }
}

SongBlock.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    styleProps: PropTypes.shape().isRequired,
};
export default SongBlock;
