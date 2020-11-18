import React from 'react';
import noCrystal from '../../../assets/sidequests/no_crystal.png'
import crystal from '../../../assets/sidequests/crystal.png'

class Crystal extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        switch (this.props.current) {
            case 0:
                return (
                    <img src={noCrystal} alt="Gratitude Crystals" onClick={this.handleClick} width={this.props.styleProps.width/8}/>
                );
            case 1:
                return (
                    <img src={crystal} alt="Gratitude Crystals" onClick={this.handleClick} width={this.props.styleProps.width/8}/>
                );
            default:
                return null;
        }
    }

    handleClick() {
        this.props.onChange("crystals")
    }
}

export default Crystal;