import React from 'react';

class BasicCounters extends React.Component {

    render(){
        return (
            <div className={"Counters"} style={{...this.props.style, color: this.props.colorScheme.text}}>
                <p> Locations Checked: {this.props.locationsChecked} </p> 
                <p> Locations Accessible: {this.props.totalAccessible} </p>
                <p> Locations Remaining: {this.props.checksRemaining} </p>  
            </div>
        );
    }
}
export default BasicCounters;