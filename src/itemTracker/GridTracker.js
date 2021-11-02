import React from 'react';
import _ from 'lodash';
// import { Container, tr, td } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Logic from '../logic/Logic';
// import tdorScheme from '../customization/tdorScheme';
import Item from './Item';

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
        return (
            <table>
                <tr>
                    <td>
                        <Item itemName="Progressive Beetle" images={this.beetleImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                    <td>
                        <Item itemName="Slingshot" images={this.slingshotImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                    <td>
                        <Item itemName="Bomb Bag" images={this.bombImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                    <td>
                        <Item itemName="Bug Net" images={this.bugNetImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                    <td>
                        <Item itemName="Bow" images={this.bowImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Item itemName="Clawshots" images={this.clawshotsImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                    <td>
                        <Item itemName="Whip" images={this.whipImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                    <td>
                        <Item itemName="Gust Bellows" images={this.bellowsImages} logic={this.props.logic} onChange={this.props.handleItemClick} ignoreItemClass />
                    </td>
                </tr>
            </table>
        );
    }
}

GridTracker.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    // styleProps: PropTypes.shape().isRequired,
//     tdorScheme: PropTypes.instanceOf(tdorScheme).isRequired,
};

export default GridTracker;
