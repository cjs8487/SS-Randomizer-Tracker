import React from 'react';
import PropTypes from 'prop-types';
import noPower from '../../assets/songs/No_Song.png';
import power from '../../assets/songs/Dins_Power.png';

class Power extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('power');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Power-item">
                    <img src={noPower} onClick={this.handleClick} alt="No Power" width={parent.width / 7} />
                </div>
            );
        case 1:
            return (
                <div id="Power-item">
                    <img src={power} onClick={this.handleClick} alt="Power" width={parent.width / 7} />
                </div>
            );
        default:
            return null;
        }
    }
}

Power.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};

export default Power;
