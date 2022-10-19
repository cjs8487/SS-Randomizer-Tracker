import React from 'react';
import PropTypes from 'prop-types';
import ColorScheme from './customization/ColorScheme';

class BasicCounters extends React.Component {
    render() {
        return (
            <div className="Counters" style={{ color: this.props.colorScheme.text }}>
                <p>
                    {`Locations Checked: ${this.props.locationsChecked}`}
                </p>
                <p>
                    {`Locations Accessible: ${this.props.totalAccessible}`}
                </p>
                <p>
                    {`Locations Remaining: ${this.props.checksRemaining}`}
                </p>
            </div>
        );
    }
}

BasicCounters.propTypes = {
    locationsChecked: PropTypes.number.isRequired,
    totalAccessible: PropTypes.number.isRequired,
    checksRemaining: PropTypes.number.isRequired,
    colorScheme: PropTypes.shape(ColorScheme).isRequired,
};
export default BasicCounters;
