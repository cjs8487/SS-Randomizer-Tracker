import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import miscItemBlock from '../assets/misc_items_block.png';

class AdditionalItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        };
    }

    componentDidMount() {
        this.setState({ height: this.divElement.clientHeight });
    }

    render() {
        const { width } = this.props.styleProps;
        let { height } = this.state;
        if (this.divElement !== undefined) {
            height = this.divElement.clientHeight;
        }
        const keyStyle = {
            position: 'relative',
            bottom: height / 2.3,
            left: width / 14,
        };
        const chartStyle = {
            position: 'relative',
            bottom: height / 1.98,
            left: width / 2.9,
        };
        const chargeStyle = {
            position: 'relative',
            bottom: height / 1.98,
            left: width / 1.85,
        };
        const fruitStyle = {
            position: 'relative',
            bottom: height / 1.32,
            left: width / 1.28,
        };
        const pouchStyle = {
            position: 'relative',
            bottom: height / 3.6,
            left: width / 12,
        };
        const bottleStyle = {
            position: 'relative',
            bottom: height / 3.45,
            left: width / 3.13,
        };
        const tadtoneStyle = {
            position: 'relative',
            bottom: height / 1.87,
            left: width / 1.8,
        };

        const keyWidth = this.props.styleProps.width / 6.5;
        const chartWidth = this.props.styleProps.width / 10;
        const chargeWidth = this.props.styleProps.width / 6.5;
        const pouchWidth = this.props.styleProps.width / 6.5;
        const bottleWidth = this.props.styleProps.width / 6.5;
        const fruitWidth = this.props.styleProps.width / 6.5;
        const tadtoneWidth = this.props.styleProps.width / 7;
        return (
            <div
                id="misc-items"
                ref={(divElement) => { this.divElement = divElement; }}
            >
                <img src={miscItemBlock} alt="" width={width} />
                <div style={keyStyle}>
                    <Item itemName="Lanayru Caves Small Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={keyWidth} />
                    <p style={{ margin: 0, fontSize: width / 20, color: this.props.colorScheme.text, position: 'relative', top: '26px', left: '2px' }}>Caves</p>
                </div>
                <div style={chartStyle}>
                    <Item itemName="Sea Chart" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={chartWidth} />
                </div>
                <div style={chargeStyle}>
                    <Item itemName="Spiral Charge" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={chargeWidth} />
                </div>
                <div style={pouchStyle}>
                    <Item itemName="Progressive Pouch" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={pouchWidth} />
                </div>
                <div style={bottleStyle}>
                    <Item itemName="Empty Bottle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={bottleWidth} />
                    <p style={{ fontSize: width * 0.12, position: 'relative', left: '12%', bottom: '-10px', color: this.props.colorScheme.text }}>{this.props.logic.getItem('Empty Bottle')}</p>
                </div>
                <div style={fruitStyle}>
                    <Item itemName="Life Tree Fruit" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={fruitWidth} />
                </div>
                <div style={tadtoneStyle}>
                    <Item itemName="Group of Tadtones" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={tadtoneWidth} />
                    <p style={{ fontSize: width * 0.12, position: 'relative', left: '12%', bottom: '-7px', color: this.props.colorScheme.text }}>{this.props.logic.getItem('Group of Tadtones')}</p>
                </div>
            </div>
        );
    }
}

AdditionalItems.propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    styleProps: PropTypes.shape().isRequired,
};
export default AdditionalItems;
