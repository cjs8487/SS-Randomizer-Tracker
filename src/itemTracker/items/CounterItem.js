import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ColorScheme from '../../customization/ColorScheme';
import Logic from '../../logic/Logic';
import allImages from '../Images';

class CounterItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.type === 'contextmenu') {
            this.props.onChange(this.props.itemName, true);
            e.preventDefault();
        } else {
            this.props.onChange(this.props.itemName, false);
        }
    }

    render() {
        let current = this.props.logic.getItem(this.props.itemName);
        if (_.isNil(current)) {
            current = 0;
        }
        const counterOverlayStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'grey',
            width: '50%',
            height: '60%',
            color: this.props.colorScheme.text,
            fontSize: 'xxx-large',
            pointerEvents: 'none',
        };
        const counterOverlaySpanStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: this.props.colorScheme.background,
            width: '80%',
            height: '150%',
            color: this.props.colorScheme.text,
            fontSize: 'xx-large',
            pointerEvents: 'none',
        };

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
        const image = current === 0 ? images[0] : images[1];
        const style = { ...this.props.styleProps, position: 'relative', textAlign: 'center' };
        const className = this.props.ignoreItemClass ? '' : 'item';

        if (this.props.asSpan) {
            return (
                <span className={`item-container ${className}`} style={style} onClick={this.handleClick} onContextMenu={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
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
            <div className={`item-container ${className}`} style={style} onClick={this.handleClick} onContextMenu={this.handleClick} onKeyDown={this.handleClick} role="button" tabIndex="0">
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
    logic: PropTypes.instanceOf(Logic).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    itemName: PropTypes.string.isRequired,
    imgWidth: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    ignoreItemClass: PropTypes.bool,
    styleProps: PropTypes.shape(),
    grid: PropTypes.bool,
    asSpan: PropTypes.bool,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};

CounterItem.defaultProps = {
    asSpan: false,
    ignoreItemClass: false,
    images: undefined,
    styleProps: {},
    grid: false,
};
export default CounterItem;
