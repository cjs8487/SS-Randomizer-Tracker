import React from 'react';
import noSpiralCharge from '../../../assets/no_bird_statuette.png';
import spiralCharge from '../../../assets/bird_statuette.png';

class SpiralCharge extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <img src={noSpiralCharge} alt="Spiral Charge" onClick={this.handleClick} width={this.props.styleProps.width} />
            );
        case 1:
            return (
                <img src={spiralCharge} alt="Spiral Charge" onClick={this.handleClick} width={this.props.styleProps.width} />
            );
        default:
            return null;
        }
    }

    handleClick() {
        this.props.onChange('spiralCharge');
    }
}

export default SpiralCharge;
