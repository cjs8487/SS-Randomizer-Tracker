import React from 'react';
import PropTypes from 'prop-types';
import noBottle from '../../../assets/no_bottle.png';
import bottle from '../../../assets/bottle.png';

class Bottle extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('bottle');
    }

    render() {
        if (this.props.current === 0) {
            return (
                <img src={noBottle} alt="Empty Bottle" onClick={this.handleClick} width={this.props.styleProps.width} />
            );
        }
        return (
            <img src={bottle} alt="Empty Bottle" onClick={this.handleClick} width={this.props.styleProps.width} />
        );
    }
}

Bottle.propTypes = {
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    styleProps: PropTypes.shape({
        width: PropTypes.number.isRequired,
    }).isRequired,
}

export default Bottle;
