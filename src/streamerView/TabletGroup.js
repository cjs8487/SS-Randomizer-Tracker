import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class TabletGroup extends React.Component {
    render() {
        let emeraldCurrent = _.get(this.props.items, _.camelCase('Emerald Tablet'));
        let rubyCurrent = _.get(this.props.items, _.camelCase('Ruby Tablet'));
        let amberCurrent = _.get(this.props.items, _.camelCase('Amber Tablet'));
        if (_.isNil(emeraldCurrent)) {
            emeraldCurrent = 0;
        }
        if (_.isNil(rubyCurrent)) {
            rubyCurrent = 0;
        }
        if (_.isNil(amberCurrent)) {
            amberCurrent = 0;
        }
        const emeraldTabletStyle = {
            position: 'sticky',
            top: '100%',
            left: '100%',
        };

        const rubyTabletStyle = {
            position: 'sticky',
            bottom: '100%',
            left: '100%',
        };

        const amberTabletStyle = {
            position: 'sticky',
            right: '18.5%',
        };
        return (
            <div>
                <img style={emeraldTabletStyle} src={this.props.images.emerald[emeraldCurrent]} alt={this.props.itemName} width={this.props.imgWidth} />
                <img style={rubyTabletStyle} src={this.props.images.ruby[rubyCurrent]} alt={this.props.itemName} width={this.props.imgWidth} />
                <img style={amberTabletStyle} src={this.props.images.amber[amberCurrent]} alt={this.props.itemName} width={this.props.imgWidth} />
            </div>
        );
    }
}

TabletGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
};
export default TabletGroup;
