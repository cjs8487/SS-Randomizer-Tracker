import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';
import CrystalCounter from './items/sidequest/CrystalCounter';

import questItemBlock from '../assets/quest_items_block.png';
import noCBeetle from '../assets/sidequests/no_cbeetle.png';
import cBeetle from '../assets/sidequests/cbeetle.png';
import noRattle from '../assets/sidequests/no_rattle.png';
import rattle from '../assets/sidequests/rattle.png';
import noCrystal from '../assets/sidequests/no_crystal.png';
import crystal from '../assets/sidequests/crystal.png';
import noLetter from '../assets/sidequests/no_cawlins_letter.png';
import letter from '../assets/sidequests/cawlins_letter.png';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

class QuestItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        };
        this.letterImages = [
            noLetter,
            letter,
        ];
        this.cBeetleImages = [
            noCBeetle,
            cBeetle,
        ];
        this.rattleImages = [
            noRattle,
            rattle,
        ];
        this.crystalImages = [
            noCrystal,
            crystal,
        ];
    }

    componentDidMount() {
        this.setState({ height: this.divElement.clientHeight });
    }

    render() {
        const { width } = this.props.styleProps;
        let { height } = this.state;
        if (this.divElement !== undefined) {
            height = this.divElement.clientHeight;
        }
        const letterStyle = {
            position: 'relative',
            bottom: height / 2.4,
            left: width / 14,
        };
        const cBeetleStyle = {
            position: 'relative',
            bottom: height / 2.4,
            left: width / 3.26,
        };
        const rattleStyle = {
            position: 'relative',
            bottom: height / 2.35,
            left: width / 1.85,
        };
        const crystalStyle = {
            position: 'relative',
            bottom: height / 2.4,
            left: width / 1.26,
        };

        const counterStyle = {
            position: 'relative',
            bottom: height / 3.5,
            left: width / 1.1,
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
                    <Item itemName="Cawlin's Letter" images={this.letterImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={letterWidth} />
                </div>
                <div style={cBeetleStyle}>
                    <Item itemName="Horned Colossus Beetle" images={this.cBeetleImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={cBeetleWidth} />
                </div>
                <div style={rattleStyle}>
                    <Item itemName="Baby Rattle" images={this.rattleImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={rattleWidth} />
                </div>
                <div style={crystalStyle}>
                    <GratitudeCrystals images={this.crystalImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={crystalWidth} />
                </div>
                <div style={counterStyle}>
                    <CrystalCounter current={this.props.logic.getCrystalCount()} colorScheme={this.props.colorScheme} />
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
