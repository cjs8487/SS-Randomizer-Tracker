import React from 'react';
import PropTypes from 'prop-types';
import noWisdom from '../../assets/songs/No_Song.png';
import wisdom from '../../assets/songs/Nayrus_Wisdom.png';

export default class Wisdom extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('wisdom');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Wisdom-item">
                    <img src={noWisdom} onClick={this.handleClick} alt="No Wisdom" width={parent.width / 7} />
                </div>
            );
        case 1:
            return (
                <div id="Wisdom-item">
                    <img src={wisdom} onClick={this.handleClick} alt="Wisdom" width={parent.width / 7} />
                </div>
            );
        default:
            return null;
        }
    }
}

Wisdom.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
