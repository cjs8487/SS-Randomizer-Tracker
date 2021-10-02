import React from 'react';
import PropTypes from 'prop-types';
import unknown from '../assets/hints/WotH_Unknown.png';
import woth from '../assets/hints/WotH.png';
import barren from '../assets/hints/barren.png';

class WotHHint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
        this.images = [
            unknown,
            woth,
            barren,
        ];
        this.altTexts = [
            'Unknown',
            'WotH',
            'Barren',
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

WotHHint.propTypes = {
    width: PropTypes.number.isRequired,
};

export default WotHHint;
