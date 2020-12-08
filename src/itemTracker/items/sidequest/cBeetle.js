import React from 'react';
import noCBeetle from '../../../assets/sidequests/no_cbeetle.png'
import cBeetle from '../../../assets/sidequests/cbeetle.png'

class CBeetle extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        switch (this.props.current) {
            case 0:
                return (
                    <img src={noCBeetle} alt="Horned Colossus Beetle" onClick={this.handleClick} width={this.props.styleProps.width/6.5}/>
                );
            case 1:
                return (
                    <img src={cBeetle} alt="Horned Colossus Beetle" onClick={this.handleClick} width={this.props.styleProps.width/6.5}/>
                );
            default:
                return null;
        }
    }

    handleClick() {
        this.props.onChange("cBeetle")
    }
}

export default CBeetle;