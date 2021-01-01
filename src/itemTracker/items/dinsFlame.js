import React from 'react';
import noFlame from '../../assets/swords/No_Dins_Flame.png';
import flame from '../../assets/swords/Dins_Flame.png';

export default class DinsFlame extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            return (
                <div id="Flame-item">
                    <img src={noFlame} onClick={this.handleClick} alt="Flame" width={parent.width / 4.4} />
                </div>
            );
        case 5:
        case 6:
            return (
                <div id="Flame-item">
                    <img src={flame} onClick={this.handleClick} alt="Flame" width={parent.width / 4.4} />
                </div>
            );
        default:
        }
    }

    handleClick() {
        this.props.onChange('sword');
    }
}
