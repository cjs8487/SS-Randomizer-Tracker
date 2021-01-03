import React from 'react';
import PropTypes from 'prop-types';
import noBombs from '../../assets/Bomb_Silhouette.png';
import bombs from '../../assets/Bomb_Icon.png';

export default class Bombs extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('bombs');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
            return (
                <div id="Bombs-item">
                    <img src={noBombs} onClick={this.handleClick} alt="No Bombs" width={parent.width / 6.5} />
                </div>
            );
        case 1:
            return (
                <div id="Bombs-item">
                    <img src={bombs} onClick={this.handleClick} alt="Bombs" width={parent.width / 6.5} />
                </div>
            );
        default:
            return null;
        }
    }
}

Bombs.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
