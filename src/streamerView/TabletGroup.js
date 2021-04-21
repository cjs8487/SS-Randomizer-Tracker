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
            position: 'absolute',
            left: '30%',
        };

        const rubyTabletStyle = {
            position: 'absolute',
            left: '30%',
        };
        return (
            <div style={{ position: 'relative', width: '100%', height: '100%', paddingLeft: '30%' }}>
                <img src={this.props.images.amber[amberCurrent]} alt="Amber Tablet" width={this.props.imgWidth} />
                <img style={emeraldTabletStyle} src={this.props.images.emerald[emeraldCurrent]} alt="Emerald Tablet" width={this.props.imgWidth} />
                <img style={rubyTabletStyle} src={this.props.images.ruby[rubyCurrent]} alt="Ruby Tablet" width={this.props.imgWidth} />
            </div>
        );
    }
}

TabletGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    imgWidth: PropTypes.number.isRequired,
};
export default TabletGroup;
