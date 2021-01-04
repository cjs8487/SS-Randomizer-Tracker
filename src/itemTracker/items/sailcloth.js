import React from 'react';
import PropTypes from 'prop-types';
import noSailcloth from '../../assets/main quest/No_Sailcloth.png';
import sailcloth from '../../assets/main quest/Sailcloth.png';

class Sailcloth extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('sailcloth');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Sailcloth-item">
                    <img src={noSailcloth} onClick={this.handleClick} alt="No Sailcloth" width={parent.width / 5.2} />
                </div>
            );
        case 1:
            return (
                <div id="Sailcloth-item">
                    <img src={sailcloth} onClick={this.handleClick} alt="Sailcloth" width={parent.width / 5.2} />
                </div>
            );
        default:
            return null;
        }
    }
}

Sailcloth.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};

export default Sailcloth;
