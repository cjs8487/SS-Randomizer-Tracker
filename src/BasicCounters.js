import React from 'react';

class BasicCounters extends React.Component {

    render(){
        let checksRemaining = this.props.totalChecks - this.props.totalChecksChecked;
        return (
            <div className={"Counters"} style={this.props.style}>
                <p> Total Checks:  {+ this.props.totalChecks} </p>
                <p> Checks Checked: {+ this.props.totalChecksChecked} </p> 
                <p> Checks Remaining: {+ checksRemaining} </p>  
            </div>
        );
    }
}
export default BasicCounters;