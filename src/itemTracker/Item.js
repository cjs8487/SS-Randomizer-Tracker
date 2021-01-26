import React from 'react';
import PropTypes from 'prop-types';
import Logic from '../logic/Logic';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange(this.props.itemName);
    }

    render() {
        const current = this.props.logic.getItem(this.props.itemName);
        const className = this.props.ignoreItemClass ? '' : 'item';
        return (
            <div className={className} onClick={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
                <img src={this.props.images[current]} alt={this.props.itemName} width={this.props.imgWidth} />
            </div>
        );
    }
}

Item.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    ignoreItemClass: PropTypes.bool,
};
Item.defaultProps = {
    ignoreItemClass: false,
};
export default Item;
