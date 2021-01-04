import React from 'react';
import PropTypes from 'prop-types';
import noCourage from '../../assets/songs/No_Song.png';
import courage from '../../assets/songs/Farores_Courage.png';

class Courage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('courage');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Courage-item">
                    <img src={noCourage} onClick={this.handleClick} alt="No Courage" width={parent.width / 7} />
                </div>
            );
        case 1:
            return (
                <div id="Courage-item">
                    <img src={courage} onClick={this.handleClick} alt="Courage" width={parent.width / 7} />
                </div>
            );
        default:
            return null;
        }
    }
}

Courage.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};

export default Courage;
