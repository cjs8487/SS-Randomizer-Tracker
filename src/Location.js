import React from 'react'

class Location extends React.Component {

    render() {
        return (
            <li>{this.props.name}</li>
        );
    }
}

export default Location;