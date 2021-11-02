import React from 'react';
import PropTypes from 'prop-types';
import Logic from '../logic/Logic';
import allImages from './Images';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.type === 'click') {
            this.props.onChange(this.props.itemName, false);
        } else if (e.type === 'contextmenu') {
            this.props.onChange(this.props.itemName, true);
            e.preventDefault();
        }
    }

    render() {
        const current = this.props.logic.getItem(this.props.itemName);
        const className = this.props.ignoreItemClass ? '' : 'item';
        let images;
        if (!this.props.images) {
            if (this.props.grid) {
                images = allImages[`${this.props.itemName} Grid`];
            } else {
                images = allImages[this.props.itemName];
            }
        } else {
            images = this.props.images;
        }
        const style = this.props.styleProps;
        // if (current === 0) {
        //     style = { ...style, opacity: '0.15' };
        //     current = 1;
        // }
        return (
            <div className={`item-container ${className}`} style={style} onClick={this.handleClick} onContextMenu={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
                <img src={images[current]} alt={this.props.itemName} width={this.props.imgWidth} />
            </div>
        );
    }
}

Item.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    ignoreItemClass: PropTypes.bool,
    styleProps: PropTypes.shape(),
    grid: PropTypes.bool,
};
Item.defaultProps = {
    ignoreItemClass: false,
    images: undefined,
    styleProps: {},
    grid: false,
};
export default Item;
