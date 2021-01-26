import React from 'react';
import PropTypes from 'prop-types';
import Logic from '../../../logic/Logic';

class GratitudeCrystals extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('5 Gratitude Crystal');
    }

    render() {
        const current = this.props.logic.getCrystalCount() >= 1 ? 1 : 0;
        return (
            <div className="item" onClick={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
                <img src={this.props.images[current]} alt="Gratitude Crystals" width={this.props.imgWidth} />
            </div>
        );
    }
}

GratitudeCrystals.propTypes = {
    onChange: PropTypes.func.isRequired,
    images: PropTypes.arrayOf().isRequired,
    imgWidth: PropTypes.number.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
};
export default GratitudeCrystals;
