import React from 'react';
import PropTypes from 'prop-types';
import noTablet from '../../assets/tablets/No_Amber_Tablet.png';
import tablet from '../../assets/tablets/amber_tablet.png';

export default class AmberTablet extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('amberTablet');
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;

        switch (current) {
        case 0:
            return (
                <div id="Tablet-item">
                    <img src={noTablet} onClick={this.handleClick} alt="No Tablet" width={parent.width / 5.57} />
                </div>
            );
        case 1:
            return (
                <div id="Tablet-item">
                    <img src={tablet} onClick={this.handleClick} alt="Tablet" width={parent.width / 5.57} />
                </div>
            );
        default:
            return null;
        }
    }
}

AmberTablet.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    parent: PropTypes.number.isRequired,
};
