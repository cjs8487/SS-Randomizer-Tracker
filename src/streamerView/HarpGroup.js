import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CounterItem from './CounterItem';

class HarpGroup extends React.Component {
    render() {
        let harpCurrent = _.get(this.props.items, _.camelCase('Goddess Harp'));
        let balladCurrent = _.get(this.props.items, _.camelCase('Ballad of the Goddess'));
        let courageCurrent = _.get(this.props.items, _.camelCase('Farores Courage'));
        let wisdomCurrent = _.get(this.props.items, _.camelCase('Nayrus Wisdom'));
        let powerCurrent = _.get(this.props.items, _.camelCase('Dins Power'));
        if (_.isNil(harpCurrent)) {
            harpCurrent = 0;
        }
        if (_.isNil(balladCurrent)) {
            balladCurrent = 0;
        }
        if (_.isNil(courageCurrent)) {
            courageCurrent = 0;
        }
        if (_.isNil(wisdomCurrent)) {
            wisdomCurrent = 0;
        }
        if (_.isNil(powerCurrent)) {
            powerCurrent = 0;
        }
        const emeraldTabletStyle = {
            // position: 'absolute',
            // left: '30%',
        };

        const rubyTabletStyle = {
            // position: 'absolute',
            // left: '30%',
        };
        return (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img src={this.props.images.harp[harpCurrent]} alt="Goddess Harp" width={this.props.imgWidth} />
                <img style={emeraldTabletStyle} src={this.props.images.ballad[balladCurrent]} alt="Ballad of the Goddess" width={this.props.imgWidth} />
                <img style={rubyTabletStyle} src={this.props.images.courage[courageCurrent]} alt="Farores Courage" width={this.props.imgWidth} />
                <img style={rubyTabletStyle} src={this.props.images.wisdom[wisdomCurrent]} alt="Nayrus Wisdom" width={this.props.imgWidth} />
                <img style={rubyTabletStyle} src={this.props.images.power[powerCurrent]} alt="Dins Power" width={this.props.imgWidth} />
                <span>
                    <CounterItem itemName="Song of the Hero" images={this.props.images.soth} items={this.props.items} imgWidth={this.props.imgWidth} asSpan />
                </span>
            </div>
        );
    }
}

HarpGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    imgWidth: PropTypes.number.isRequired,
};
export default HarpGroup;
