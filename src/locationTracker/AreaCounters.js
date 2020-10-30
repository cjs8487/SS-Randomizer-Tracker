import React from 'react';

class AreaCounters extends React.Component{

    render()
    {
        return (
            <span> {this.props.totalChecksAccessible}/{this.props.totalChecksLeftInArea}</span>
        );
    }
}

export default AreaCounters;