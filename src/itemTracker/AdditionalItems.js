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
        const pouchStyle = {
            position: 'relative',
            bottom: width * 0.425 + 400 / width,
            left: width * 0.08,
        };
        const bottleStyle = {
            position: 'relative',
            bottom: width * 0.425 + 600 / width,
            left: width * 0.31,
        };
        const chargeStyle = {
            position: 'relative',
            bottom: width * 0.65 + 2000 / width,
            left: width * 0.54,
        };
        const tadtoneStyle = {
            position: 'relative',
            bottom: width * 0.63 + 2400 / width,
            left: width * 0.785,
        };
        const keyStyle = {
            position: 'relative',
            bottom: width * 0.67 + 3000 / width,
            left: width * 0.08,
        };
        const chartStyle = {
            position: 'relative',
            bottom: width * 0.74 + 3000 / width,
            left: width * 0.35,
        };
        const fruitStyle = {
            position: 'relative',
            bottom: width * 0.73 + 3400 / width,
            left: width * 0.542,
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
                <div style={pouchStyle}>
                    <Item itemName="Progressive Pouch" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={pouchWidth} />
                </div>
                <div style={bottleStyle}>
                    <Item itemName="Empty Bottle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={bottleWidth} />
                    <p style={{ fontSize: width * 0.12, position: 'relative', left: '12%', bottom: '-10px', color: this.props.colorScheme.text }}>{this.props.logic.getItem('Empty Bottle')}</p>
                </div>
                <div style={chargeStyle}>
                    <Item itemName="Spiral Charge" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={chargeWidth} />
                </div>
                <div style={tadtoneStyle}>
                    <Item itemName="Group of Tadtones" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={tadtoneWidth} />
                    <p style={{ fontSize: width * 0.12, position: 'relative', left: '12%', bottom: '-7px', color: this.props.colorScheme.text }}>{this.props.logic.getItem('Group of Tadtones')}</p>
                </div>
                <div style={keyStyle}>
                    <Item itemName="Lanayru Caves Small Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={keyWidth} />
                    <p style={{ margin: 0, fontSize: width / 20, color: this.props.colorScheme.text, position: 'relative', top: `${keyWidth * 0.75}px`, left: '2px' }}>Caves</p>
                </div>
                <div style={chartStyle}>
                    <Item itemName="Sea Chart" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={chartWidth} />
                </div>
                <div style={fruitStyle}>
                    <Item itemName="Life Tree Fruit" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={fruitWidth} />
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
