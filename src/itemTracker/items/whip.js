import React from 'react';
import PropTypes from 'prop-types';
import noWhip from '../../assets/Whip_Silhouette.png';
import whip from '../../assets/Whip_Icon.png';

class Whip extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('whip');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Whip-item">
                    <img src={noWhip} onClick={this.handleClick} alt="No Whip" width={parent.width / 5.5} />
                </div>
            );
        case 1:
            return (
                <div id="Whip-item">
                    <img src={whip} onClick={this.handleClick} alt="Whip" width={parent.width / 5.5} />
                </div>
            );
        default:
            return null;
        }
    }
}

Whip.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};

export default Whip;
