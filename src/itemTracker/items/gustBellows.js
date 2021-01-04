import React from 'react';
import PropTypes from 'prop-types';
import noGustBellows from '../../assets/Gust_Bellows_Silhouette.png';
import gustBellows from '../../assets/Gust_Bellows_Icon.png';

class GustBellows extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('gustBellows');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="GustBellows-item">
                    <img src={noGustBellows} onClick={this.handleClick} alt="No GustBellows" width={parent.width / 5.2} />
                </div>
            );
        case 1:
            return (
                <div id="GustBellows-item">
                    <img src={gustBellows} onClick={this.handleClick} alt="GustBellows" width={parent.width / 5.2} />
                </div>
            );
        default:
            return null;
        }
    }
}

GustBellows.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};

export default GustBellows;
