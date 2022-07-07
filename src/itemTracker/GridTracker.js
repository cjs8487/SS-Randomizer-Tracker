import React from 'react';
import _ from 'lodash';
// import { Container, tr, td } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import Item from './Item';
import CrystalCounter from './items/sidequest/CrystalCounter';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';

import noTablets from '../assets/tablets/no_tablets.png';
import CounterItem from './items/CounterItem';

class GridTracker extends React.Component {
    constructor(props) {
        super(props);

        this.grid = _.chunk(_.keys(this.props.logic.max), 5);

        this.handleExtraWalletClick = this.handleExtraWalletClick.bind(this);
    }

    handleExtraWalletClick() {
        this.props.handleItemClick('Extra Wallet');
    }

    render() {
        // const beetleWidth = this.props.styleProps.width / 5.2;
        // const slingshotWidth = this.props.styleProps.width / 6.5;
        // const bombsWidth = this.props.styleProps.width / 6.5;
        // const bugNetWidth = this.props.styleProps.width / 6.5;
        // const bowWidth = this.props.styleProps.width / 5.5;
        // const clawshotsWidth = this.props.styleProps.width / 4.6;
        // const whipWidth = this.props.styleProps.width / 5.5;
        // const bellowsWidth = this.props.styleProps.width / 5.2;
        const emeraldTabletStyle = {
            position: 'absolute',
            left: '100%',
            bottom: '0%',
            transform: 'translate(-100%)',
        };

        const rubyTabletStyle = {
            position: 'absolute',
            left: '100%',
            top: '0%',
            transform: 'translate(-100%)',
        };

        const amberTabletStyle = {
            position: 'absolute',
            left: '0%',
            top: '0%',
        };

        const imgWidth = this.props.styleProps.width / 10;
        return (
            <table>
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <Item itemName="Progressive Sword" logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Progressive Beetle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Slingshot" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Bomb Bag" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Bug Net" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td rowSpan="2" colSpan="2">
                            <div style={{ position: 'relative' }}>
                                <img src={noTablets} alt="" />
                                <Item styleProps={amberTabletStyle} itemName="Amber Tablet" logic={this.props.logic} onChange={this.props.handleItemClick} />
                                <Item styleProps={emeraldTabletStyle} itemName="Emerald Tablet" logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                                <Item styleProps={rubyTabletStyle} itemName="Ruby Tablet" logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Item itemName="Bow" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Clawshots" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Whip" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Gust Bellows" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{ margin: 0, fontSize: 'small', color: this.props.colorScheme.text }}>Caves</p>
                            <Item itemName="LanayruCaves Small Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Sea Chart" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Spiral Charge" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Progressive Pouch" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <CounterItem itemName="Empty Bottle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} colorScheme={this.props.colorScheme} ignoreItemClass />
                        </td>
                        <td>
                            <div>
                                <Item itemName="Progressive Wallet" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} />
                            </div>
                            <div style={{ position: 'relative', left: '0%', top: '20px' }} onClick={this.handleExtraWalletClick} onKeyDown={this.handleExtraWalletClick} tabIndex="0" role="button">
                                <CrystalCounter current={`+${this.props.logic.getItem('Extra Wallet') * 300}`} colorScheme={this.props.colorScheme} />
                            </div>
                        </td>
                        <td>
                            <Item itemName="Progressive Mitts" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Item itemName="Goddess Harp" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Ballad of the Goddess" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Farore's Courage" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Nayru's Wisdom" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Din's Power" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <div style={{ position: 'relative' }}>
                                <CounterItem itemName="Song of the Hero" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} colorScheme={this.props.colorScheme} grid ignoreItemClass />
                            </div>
                        </td>
                        <td>
                            <Item itemName="Stone of Trials" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Item itemName="Water Scale" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Fireshield Earrings" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Cawlin's Letter" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Horned Colossus Beetle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Baby Rattle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid ignoreItemClass />
                        </td>
                        <td>
                            <div>
                                <GratitudeCrystals logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} grid />
                            </div>
                            <div style={{ position: 'relative', bottom: '100%', pointerEvents: 'none' }}>
                                <CrystalCounter current={this.props.logic.getCrystalCount()} colorScheme={this.props.colorScheme} />
                            </div>
                        </td>
                        <td>
                            <Item itemName="Life Tree Fruit" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

GridTracker.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    styleProps: PropTypes.shape().isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};

export default GridTracker;
