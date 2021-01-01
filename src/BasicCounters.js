import React from 'react';

class BasicCounters extends React.Component {
    render() {
        const checksRemaining = this.props.totalChecks - this.props.totalChecksChecked;
        let totalAccessible = 0;
        this.props.locationGroups.forEach((location) => {
            totalAccessible += this.props.accessiblePerLocation[location];
        });
        return (
            <div className="Counters" style={{ ...this.props.style, color: this.props.colorScheme.text }}>
                <p>
                    {' '}
                    Locations Checked:
                    {+this.props.totalChecksChecked}
                </p>
                <p>
                    {' '}
                    Locations Accessible:
                    {+totalAccessible}
                </p>
                <p>
                    {' '}
                    Locations Remaining:
                    {+checksRemaining}
                </p>
            </div>
        );
    }
}
export default BasicCounters;
