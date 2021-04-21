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
        const counterOverlayStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'black',
            width: '50%',
            height: '60%',
            color: 'white',
            fontSize: 'xxx-large',
        };
        const counterOverlaySpanStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'black',
            width: '80%',
            height: '150%',
            color: 'white',
            fontSize: 'xx-large',
        };
        if (this.props.asSpan) {
            return (
                <span style={{ position: 'relative', textAlign: 'center' }}>
                    <img src={image} alt={this.props.itemName} width={this.props.imgWidth} />
                    {
                        current > 0 && (
                            <div style={counterOverlaySpanStyle}>
                                <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{current}</p>
                            </div>
                        )
                    }
                </span>
            );
        }
        return (
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <img src={image} alt={this.props.itemName} width={this.props.imgWidth} />
                {
                    current > 0 && (
                        <div style={counterOverlayStyle}>
                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{current}</p>
                        </div>
                    )
                }
            </div>
        );
    }
}

CounterItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    asSpan: PropTypes.bool,
};

CounterItem.defaultProps = {
    asSpan: false,
};
export default CounterItem;
