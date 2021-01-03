import React from 'react';
import PropTypes from 'prop-types';
import slingshot from '../../assets/Slingshot_Icon.png';
import noSlingshot from '../../assets/Slingshot_Silhouette.png';

export default class Slingshot extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('slingshot');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
            return (
                <div id="Slingshot-item">
                    <img src={noSlingshot} onClick={this.handleClick} alt="No Slingshot" width={parent.width / 6.5} />
                </div>
            );
        case 1:
            return (
                <div id="Slingshot-item">
                    <img src={slingshot} onClick={this.handleClick} alt="Slingshot" width={parent.width / 6.5} />
                </div>
            );
        default:
            return null;
        }
    }
}

Slingshot.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
