import React from 'react';
import noBottle from '../../../assets/no_bottle.png'
import bottle from '../../../assets/bottle.png'

class Bottle extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        if (this.props.current === 0 ) {
            return (
                <img src={noBottle} alt="Empty Bottle" onClick={this.handleClick} width={this.props.styleProps.width}/>
            );
        } else {
            return (
                <img src={bottle} alt="Empty Bottle" onClick={this.handleClick} width={this.props.styleProps.width}/>
            );
        }
    }

    handleClick() {
        this.props.onChange("bottle")
    }
}

export default Bottle;