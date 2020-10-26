import React from 'react'
import ReactTooltip from 'react-tooltip'
import RequirementsTooltip from './RequirementsTooltip'
import './Location.css'

//props:
//name - the dispaly name of this location
//group - the group this check belongs to
//checked - whether or not this location has been checked (booelan)
//handler - the handler in a aprent component for managing state
class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    onClick() {
        this.props.handler(this.props.group, this.props.location.localId);
    }

    render() {
        // console.log(this.props.items)
        return (
            <div>
                <p
                    className={this.props.location.inLogic ? "in-logic" : "out-logic"}
                    style={
                        this.props.location.checked ? {textDecoration: 'line-through', cursor: "pointer"} : {cursor: "pointer"}
                    }
                    onClick={() => this.onClick()}
                    data-tip={this.props.location.needs} data-for={this.props.location.name}
                >
                    {this.props.location.name}
                </p>
                <ReactTooltip id={this.props.location.name}>
                    <RequirementsTooltip requirements={this.props.location.needs} meetsRequirement={this.props.meetsRequirement}/>
                </ReactTooltip>
            </div>
            
        );
    }
}

export default Location;