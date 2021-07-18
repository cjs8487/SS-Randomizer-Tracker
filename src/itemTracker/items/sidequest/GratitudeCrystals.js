import React from 'react';
import PropTypes from 'prop-types';
import Logic from '../../../logic/Logic';

class GratitudeCrystals extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.type === 'click') {
            this.props.onChange('5 Gratitude Crystal', false);
        } else if (e.type === 'contextmenu') {
            this.props.onChange('5 Gratitude Crystal', true);
            e.preventDefault();
        }
    }

    render() {
        const current = this.props.logic.getCrystalCount() >= 1 ? 1 : 0;
        return (
            <div className="item-container item" onClick={this.handleClick} onContextMenu={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
                <img src={this.props.images[current]} alt="Gratitude Crystals" width={this.props.imgWidth} />
            </div>
        );
    }
}

GratitudeCrystals.propTypes = {
    onChange: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    imgWidth: PropTypes.number.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
};
export default GratitudeCrystals;
