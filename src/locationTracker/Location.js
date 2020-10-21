import React from 'react'

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
        this.props.handler(this.props.group, this.props.name);
    }

    render() {
        return (
            <p
                style={this.props.checked ? {textDecoration: 'line-through', cursor: "pointer"} : {cursor: "pointer"}}
                onClick={() => this.onClick()}
            >
                {this.props.name}
            </p>
        );
    }
}

export default Location;