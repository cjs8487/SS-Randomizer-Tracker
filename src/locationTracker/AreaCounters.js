import React from 'react';

class AreaCounters extends React.Component{

    render()
    {
        return (
            <span> x/{this.props.totalChecksLeftInArea}</span>
        );
    }
}

export default AreaCounters;