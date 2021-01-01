import React from 'react';
import noLetter from '../../../assets/sidequests/no_cawlins_letter.png';
import letter from '../../../assets/sidequests/cawlins_letter.png';

class Letter extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
              <img src={noLetter} alt="Cawlin's letter" onClick={this.handleClick} width={this.props.styleProps.width / 6.5} />
            );
        case 1:
            return (
              <img src={letter} alt="Cawlin's letter" onClick={this.handleClick} width={this.props.styleProps.width / 6.5} />
            );
        default:
            return null;
        }
    }

    handleClick() {
        this.props.onChange('letter');
    }
}

export default Letter;
