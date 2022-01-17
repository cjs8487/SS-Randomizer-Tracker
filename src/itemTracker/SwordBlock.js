import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import swordBlock from '../assets/Sword_Block.png';
import noSword from '../assets/swords/No_Sword.png';
import practiceSword from '../assets/swords/Practice Sword.png';
import goddessSword from '../assets/swords/Goddess Sword.png';
import longSword from '../assets/swords/Goddess Long Sword.png';
import whiteSword from '../assets/swords/Goddess White Sword.png';
import masterSword from '../assets/swords/Master Sword.png';
import trueMasterSword from '../assets/swords/True Master Sword.png';
import noFlame from '../assets/swords/No_Farores_Flame.png';
import faroresFlame from '../assets/swords/Farores_Flame.png';
import nayrusFlame from '../assets/swords/Nayrus_Flame.png';
import dinsFlame from '../assets/swords/Dins_Flame.png';
import smallWallet from '../assets/wallets/smallWallet.png';
import mediumWallet from '../assets/wallets/mediumWallet.png';
import bigWallet from '../assets/wallets/bigWallet.png';
import giantWallet from '../assets/wallets/giantWallet.png';
import tycoonWallet from '../assets/wallets/tycoonWallet.png';
import Logic from '../logic/Logic';
import CrystalCounter from './items/sidequest/CrystalCounter';
import ColorScheme from '../customization/ColorScheme';

class SwordBlock extends React.Component {
    constructor(props) {
        super(props);
        this.swordImages = [
            noSword,
            practiceSword,
            goddessSword,
            longSword,
            whiteSword,
            masterSword,
            trueMasterSword,
        ];
        this.faroresFlameImages = [
            noFlame,
            noFlame,
            noFlame,
            faroresFlame,
            faroresFlame,
            faroresFlame,
            faroresFlame,
        ];
        this.nayrusFlameImages = [
            noFlame,
            noFlame,
            noFlame,
            noFlame,
            nayrusFlame,
            nayrusFlame,
            nayrusFlame,
        ];
        this.dinsFlameImages = [
            noFlame,
            noFlame,
            noFlame,
            noFlame,
            noFlame,
            dinsFlame,
            dinsFlame,
        ];
        this.walletImages = [
            smallWallet,
            mediumWallet,
            bigWallet,
            giantWallet,
            tycoonWallet,
        ];
        this.handleExtraWalletClick = this.handleExtraWalletClick.bind(this);
    }

    handleExtraWalletClick() {
        this.props.handleItemClick('Extra Wallet');
    }

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

        const swordWidth = this.props.styleProps.width / 1.1;
        const flameWidth = this.props.styleProps.width / 4.4;
        const walletWidth = this.props.styleProps.width / 3;

        return (
            <div id="BWheel">
                <img src={swordBlock} alt="" width={wid} />
                <div id="sword" style={swordStyle}>
                    <Item itemName="Progressive Sword" images={this.swordImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={swordWidth} />
                </div>
                <div id="faroresFlame" style={faroresFlameStyle}>
                    <Item itemName="Progressive Sword" images={this.faroresFlameImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth} />
                </div>
                <div id="nayrusFlame" style={nayrusFlameStyle}>
                    <Item itemName="Progressive Sword" images={this.nayrusFlameImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth} />
                </div>
                <div id="dinsFlame" style={dinsFlameStyle}>
                    <Item itemName="Progressive Sword" images={this.dinsFlameImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth} />
                </div>
                <div id="wallets" style={walletStyle}>
                    <Item itemName="Progressive Wallet" images={this.walletImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={walletWidth} />
                </div>
                <div id="wallets" style={extraWalletStyle} onClick={this.handleExtraWalletClick} onKeyDown={this.handleExtraWalletClick} tabIndex="0" role="button">
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
