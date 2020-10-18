import React from 'react'

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    onClick() {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <li style={this.state.checked ? {textDecoration: 'line-through'} : {}} onClick={() => this.onClick()}>{this.props.name}</li>
        );
    }
}

export default Location;