import React from 'react';
import PropTypes from 'prop-types';
import noStone from '../../assets/main quest/No_Stone.png';
import stone from '../../assets/main quest/Stone_of_Trials.png';

class Stone extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('stone');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Stone-item">
                    <img src={noStone} onClick={this.handleClick} alt="No Stone" width={parent.width / 4.6} />
                </div>
            );
        case 1:
            return (
                <div id="Stone-item">
                    <img src={stone} onClick={this.handleClick} alt="Stone" width={parent.width / 4.6} />
                </div>
            );
        default:
            return null;
        }
    }
}

Stone.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};

export default Stone;
