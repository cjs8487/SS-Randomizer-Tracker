import React from 'react';
import PropTypes from 'prop-types';
import ColorScheme from '../../../customization/ColorScheme';

class CrystalCounter extends React.Component {
    render() {
        return (
            <p style={{ fontSize: this.props.fontSize, margin: 0, color: this.props.colorScheme.text }}>{this.props.current}</p>
        );
    }
}

CrystalCounter.propTypes = {
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    current: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
};
export default CrystalCounter;
