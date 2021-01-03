import React from 'react';
import PropTypes from 'prop-types';
import noBugnet from '../../assets/Bugnet_Silhouette.png';
import bugnet from '../../assets/Bugnet_Icon.png';

export default class Bugnet extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('bugnet');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
            return (
                <div id="Bugnet-item">
                    <img src={noBugnet} onClick={this.handleClick} alt="No Bugnet" width={parent.width / 6.5} />
                </div>
            );
        case 1:
            return (
                <div id="Bugnet-item">
                    <img src={bugnet} onClick={this.handleClick} alt="Bugnet" width={parent.width / 6.5} />
                </div>
            );
        default:
            return null;
        }
    }
}

Bugnet.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
