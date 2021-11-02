import React from 'react';
import _ from 'lodash';
// import { Container, tr, td } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Logic from '../logic/Logic';
// import tdorScheme from '../customization/tdorScheme';
import Item from './Item';

import noTablets from '../assets/tablets/no_tablets.png';

class GridTracker extends React.Component {
    constructor(props) {
        super(props);

        this.grid = _.chunk(_.keys(this.props.logic.max), 5);
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
                        <td>
                            <Item itemName="Bow" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
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
                            <Item itemName="Clawshots" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Whip" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                        </td>
                        <td>
                            <Item itemName="Gust Bellows" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={imgWidth} ignoreItemClass />
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
//     tdorScheme: PropTypes.instanceOf(tdorScheme).isRequired,
};

export default GridTracker;
