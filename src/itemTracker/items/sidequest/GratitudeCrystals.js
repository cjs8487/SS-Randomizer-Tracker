import React from 'react';
import PropTypes from 'prop-types';
import Logic from '../../../logic/Logic';
import allImages from '../../Images';
import KeyDownWrapper from '../../../KeyDownWrapper';

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
        const className = this.props.ignoreItemClass ? '' : 'item';
        let images;
        if (!this.props.images) {
            if (this.props.grid) {
                images = allImages['Gratitude Crystals Grid'];
            } else {
                images = allImages['Gratitude Crystals'];
            }
        } else {
            images = this.props.images;
        }
        return (
            <div
                className={`item-container ${className}`}
                onClick={this.handleClick}
                onContextMenu={this.handleClick}
                onKeyDown={KeyDownWrapper.onSpaceKey(this.handleClick)}
                role="button"
                tabIndex="0"
            >
                <img src={images[current]} alt="Gratitude Crystals" width={this.props.imgWidth} />
            </div>
        );
    }
}

GratitudeCrystals.propTypes = {
    onChange: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    imgWidth: PropTypes.string.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    ignoreItemClass: PropTypes.bool,
    grid: PropTypes.bool,
};
GratitudeCrystals.defaultProps = {
    ignoreItemClass: false,
    images: undefined,
    grid: false,
};
export default GratitudeCrystals;
