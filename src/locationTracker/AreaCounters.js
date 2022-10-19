import React from 'react';
import PropTypes from 'prop-types';
import ColorScheme from '../customization/ColorScheme';

class AreaCounters extends React.Component {
    render() {
        return (
            <span style={{ color: this.props.colorScheme.text }}>
                {` ${this.props.totalChecksAccessible}/${this.props.totalChecksLeftInArea}`}
            </span>
        );
    }
}

AreaCounters.propTypes = {
    colorScheme: PropTypes.shape(ColorScheme).isRequired,
    totalChecksAccessible: PropTypes.number.isRequired,
    totalChecksLeftInArea: PropTypes.number.isRequired,
};
export default AreaCounters;
