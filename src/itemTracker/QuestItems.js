import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';
import CrystalCounter from './items/sidequest/CrystalCounter';

import questItemBlock from '../assets/quest_items_block.png';

import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

class QuestItems extends React.Component {

    render() {
        const { width } = this.props.styleProps;
        const letterStyle = {
            position: 'relative',
            bottom: width * 0.18 + 900 / width,
            left: width / 14,
        };
        const cBeetleStyle = {
            position: 'relative',
            bottom: width * 0.2 + 300 / width,
            left: width / 3.26,
        };
        const rattleStyle = {
            position: 'relative',
            bottom: width * 0.205 + 200 / width,
            left: width / 1.85,
        };
        const crystalStyle = {
            position: 'relative',
            bottom: width * 0.19 + 400 / width,
            left: width / 1.26,
        };

        const counterStyle = {
            position: 'relative',
            bottom: width * 0.15,
            left: width * 0.9,
        };

        const letterWidth = this.props.styleProps.width / 6.5;
        const cBeetleWidth = this.props.styleProps.width / 6.5;
        const rattleWidth = this.props.styleProps.width / 6.5;
        const crystalWidth = this.props.styleProps.width / 8;

        return (
            <div
                id="quest-items"
                ref={(divElement) => { this.divElement = divElement; }}
            >
                <img src={questItemBlock} alt="" width={width} />
                <div style={letterStyle}>
                    <Item itemName="Cawlin's Letter" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={letterWidth} />
                </div>
                <div style={cBeetleStyle}>
                    <Item itemName="Horned Colossus Beetle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={cBeetleWidth} />
                </div>
                <div style={rattleStyle}>
                    <Item itemName="Baby Rattle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={rattleWidth} />
                </div>
                <div style={crystalStyle}>
                    <GratitudeCrystals logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={crystalWidth} />
                </div>
                <div style={counterStyle}>
                    <CrystalCounter current={this.props.logic.getCrystalCount()} colorScheme={this.props.colorScheme} fontSize={crystalWidth * 1.25} />
                </div>
            </div>
        );
    }
}

QuestItems.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    styleProps: PropTypes.shape().isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};
export default QuestItems;
