import React from 'react';
import noSword from '../../assets/swords/No_Sword.png';
import practiceSword from '../../assets/swords/Practice Sword.png';
import goddessSword from '../../assets/swords/Goddess Sword.png';
import longSword from '../../assets/swords/Goddess Long Sword.png';
import whiteSword from '../../assets/swords/Goddess White Sword.png';
import masterSword from '../../assets/swords/Master Sword.png';
import trueMasterSword from '../../assets/swords/True Master Sword.png';

export default class Sword extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
            return (
                <div id="Sword-item">
                    <img src={noSword} onClick={this.handleClick} alt="No Sword" width={parent.width / 1.1} />
                </div>
            );
        case 1:
            return (
                <div id="Sword-item">
                    <img src={practiceSword} onClick={this.handleClick} alt="Sword" width={parent.width / 1.1} />
                </div>
            );
        case 2:
            return (
                <div id="Sword-item">
                    <img src={goddessSword} onClick={this.handleClick} alt="Sword" width={parent.width / 1.1} />
                </div>
            );
        case 3:
            return (
                <div id="Sword-item">
                    <img src={longSword} onClick={this.handleClick} alt="Sword" width={parent.width / 1.1} />
                </div>
            );
        case 4:
            return (
                <div id="Sword-item">
                    <img src={whiteSword} onClick={this.handleClick} alt="Sword" width={parent.width / 1.1} />
                </div>
            );
        case 5:
            return (
                <div id="Sword-item">
                    <img src={masterSword} onClick={this.handleClick} alt="Sword" width={parent.width / 1.1} />
                </div>
            );
        case 6:
            return (
                <div id="Sword-item">
                    <img src={trueMasterSword} onClick={this.handleClick} alt="Sword" width={parent.width / 1.1} />
                </div>
            );
        default:
        }
    }

    handleClick() {
        this.props.onChange('sword');
    }
}
