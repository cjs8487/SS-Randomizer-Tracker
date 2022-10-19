import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import allImages from './Images';
import swordBlock from '../assets/Sword_Block.png';

import Logic from '../logic/Logic';
import CrystalCounter from './items/sidequest/CrystalCounter';
import ColorScheme from '../customization/ColorScheme';
import KeyDownWrapper from '../KeyDownWrapper';

class SwordBlock extends React.Component {
    constructor(props) {
        super(props);
        this.handleExtraWalletClick = this.handleExtraWalletClick.bind(this);
    }

    handleExtraWalletClick() {
        this.props.handleItemClick('Extra Wallet');
    }

    render() {
        const wid = this.props.styleProps.width;

        const swordStyle = {
            position: 'relative',
            bottom: (wid / 0.84 - 1 / wid),
            left: wid / 2.85,
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

        const walletStyle = {
            position: 'relative',
            bottom: (wid / 2.46 - 1 / wid),
            left: wid / 1.6,
        };
        const extraWalletStyle = {
            position: 'relative',
            bottom: (wid / 4.6 - 1 / wid),
            left: wid / 1.2,
        };

        const swordWidth = `${this.props.styleProps.width / 3.1}px`;
        const flameWidth = `${this.props.styleProps.width / 4.4}px`;
        const walletWidth = `${this.props.styleProps.width / 3}px`;

        return (
            <div id="BWheel">
                <img src={swordBlock} alt="" width={wid} />
                <div id="sword" style={swordStyle}>
                    <Item itemName="Progressive Sword" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={swordWidth} />
                </div>
                <div id="faroresFlame" style={faroresFlameStyle}>
                    <Item itemName="Progressive Sword" images={allImages['Farore\'s Flame']} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth} />
                </div>
                <div id="nayrusFlame" style={nayrusFlameStyle}>
                    <Item itemName="Progressive Sword" images={allImages['Nayru\'s Flame']} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth} />
                </div>
                <div id="dinsFlame" style={dinsFlameStyle}>
                    <Item itemName="Progressive Sword" images={allImages['Din\'s Flame']} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth} />
                </div>
                <div id="wallets" style={walletStyle}>
                    <Item itemName="Progressive Wallet" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={walletWidth} />
                </div>
                <div
                    id="wallets"
                    style={extraWalletStyle}
                    onClick={this.handleExtraWalletClick}
                    onKeyDown={KeyDownWrapper.onSpaceKey(this.handleExtraWalletClick)}
                    tabIndex="0"
                    role="button"
                >
                    {/* Dear CJ,
                        Why?

                        Yours sincerly,
                        Esme */}
                    <CrystalCounter current={`+${this.props.logic.getItem('Extra Wallet') * 300}`} colorScheme={this.props.colorScheme} />
                </div>
            </div>
        );
    }
}

SwordBlock.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    styleProps: PropTypes.shape().isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};
export default SwordBlock;
