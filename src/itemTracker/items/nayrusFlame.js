import React from 'react';
import PropTypes from 'prop-types';
import noFlame from '../../assets/swords/No_Nayrus_Flame.png';
import flame from '../../assets/swords/Nayrus_Flame.png';

export default class NayrusFlame extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('sword');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
        case 1:
        case 2:
        case 3:
            return (
                <div id="Flame-item">
                    <img src={noFlame} onClick={this.handleClick} alt="Flame" width={parent.width / 4.4} />
                </div>
            );
        case 4:
        case 5:
        case 6:
            return (
                <div id="Flame-item">
                    <img src={flame} onClick={this.handleClick} alt="Flame" width={parent.width / 4.4} />
                </div>
            );
        default:
            return null;
        }
    }
}

NayrusFlame.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
