import React from 'react';

class AreaCounters extends React.Component {
    render() {
        return (
            <span style={{ color: this.props.colorScheme.text }}>
                {' '}
                {this.props.totalChecksAccessible}
                /
                {this.props.totalChecksLeftInArea}
            </span>
        );
    }
}

export default AreaCounters;
