import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class StreamerViewItem extends React.Component {
    render() {
        const current = _.get(this.props.items, _.camelCase(this.props.itemName));
        const className = this.props.ignoreItemClass ? '' : 'item';
        return (
            <div className={`item-container ${className}`}>
                <img src={this.props.images[current]} alt={this.props.itemName} width={this.props.imgWidth} />
            </div>
        );
    }
}

StreamerViewItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    ignoreItemClass: PropTypes.bool,
};
StreamerViewItem.defaultProps = {
    ignoreItemClass: false,
};
export default StreamerViewItem;
