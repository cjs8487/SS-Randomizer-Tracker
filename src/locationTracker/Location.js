import React from 'react'

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
            <li style={this.props.checked ? {textDecoration: 'line-through'} : {}} onClick={() => this.onClick()}>{this.props.name}</li>
        );
    }
}

export default Location;