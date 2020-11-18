import React from 'react';
import noLetter from '../../../assets/sidequests/no_rattle.png'
import letter from '../../../assets/sidequests/rattle.png'

class Rattle extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        switch (this.props.current) {
            case 0:
                return (
                    <img src={noLetter} alt="Baby Rattle" onClick={this.handleClick} width={this.props.styleProps.width/6.5}/>
                );
            case 1:
                return (
                    <img src={letter} alt="Baby Rattle" onClick={this.handleClick} width={this.props.styleProps.width/6.5}/>
                );
            default:
                return null;
        }
    }

    handleClick() {
        this.props.onChange("rattle")
    }
}

export default Rattle;