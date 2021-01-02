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
        this.props.checked ? console.log('Location unclicked') : console.log('Location clicked');
    }

    render() {
        // console.log(this.props.items)
        let style = {
            textDecoration: this.props.location.checked ? 'line-through' : 'none',
            cursor: "pointer",
            color: this.props.colorScheme[this.props.location.logicalState]
        }
        return (
            <div>
                <p
                    style={style}
                    onClick={() => this.onClick()}
                    data-tip={this.props.location.needs} data-for={this.props.location.name}
                >
                    {this.props.location}
                </p>
                <ReactTooltip id={this.props.location.name}>
                    <RequirementsTooltip requirements={this.props.location.needs} meetsRequirement={this.props.meetsRequirement}/>
                </ReactTooltip>
            </div>
            
        );
    }
}

export default Location;