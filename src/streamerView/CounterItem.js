import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class CounterItem extends React.Component {
    render() {
        let current = _.get(this.props.items, _.camelCase(this.props.itemName));
        if (_.isNil(current)) {
            current = 0;
        }
        const image = current === 0 ? this.props.images[0] : this.props.images[1];
        return (
            <div>
                <img src={image} alt={this.props.itemName} width={this.props.imgWidth} />
            </div>
        );
    }
}

CounterItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
};
export default CounterItem;
