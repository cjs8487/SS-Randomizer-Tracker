import React from 'react';
import PropTypes from 'prop-types';
import unknown from '../assets/hints/unknown.png';
import unrequired from '../assets/No_Entrance.png';
import required from '../assets/Entrance.png';

class HintMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
        this.images = [
            unknown,
            unrequired,
            required,
        ];
        this.altTexts = [
            'Unknown',
            'Not Required',
            'Required',
        ];
        this.max = 2;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((state) => ({ current: state.current < this.max ? state.current + 1 : 0 }));
    }

    render() {
        return (
            <div onClick={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
                <img src={this.images[this.state.current]} alt={this.altTexts[this.state.current]} width={this.props.width} />
            </div>
        );
    }
}

HintMarker.propTypes = {
    width: PropTypes.number.isRequired,
};

export default HintMarker;
