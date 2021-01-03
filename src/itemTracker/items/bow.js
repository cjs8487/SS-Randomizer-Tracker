import React from 'react';
import PropTypes from 'prop-types';
import noBow from '../../assets/Bow_Silhouette.png';
import bow from '../../assets/Bow_Icon.png';

export default class Bow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('bow');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Bow-item">
                    <img src={noBow} onClick={this.handleClick} alt="No Bow" width={parent.width / 5.5} />
                </div>
            );
        case 1:
            return (
                <div id="Bow-item">
                    <img src={bow} onClick={this.handleClick} alt="Bow" width={parent.width / 5.5} />
                </div>
            );
        default:
            return null;
        }
    }
}

Bow.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
