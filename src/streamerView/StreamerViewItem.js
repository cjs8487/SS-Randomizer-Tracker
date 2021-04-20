import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class StreamerViewItem extends React.Component {
    render() {
        let current = _.get(this.props.items, _.camelCase(this.props.itemName));
        if (_.isNil(current)) {
            current = 0;
        }
        return (
            <div>
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
};
export default StreamerViewItem;
