import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Item from './Item';

import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

class AdditionalItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };
    }

    componentDidMount() {
        this.setState({ width: this.divElement.clientWidth });
    }

    render() {
        let { width } = this.state;
        const widthDiv = 6;
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }
        return (
            <Row
                ref={(divElement) => { this.divElement = divElement; }}
                noGutters="true"
            >
                <Col>
                    <p style={{ margin: 0, fontSize: 'small', color: this.props.colorScheme.text }}>Caves</p>
                    <Item itemName="LanayruCaves Small Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / widthDiv} />
                </Col>
                <Col>
                    <Item itemName="Sea Chart" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / widthDiv} />
                </Col>
                <Col>
                    <Item itemName="Spiral Charge" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / widthDiv} />
                </Col>
                <Col>
                    <Item itemName="Progressive Pouch" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / widthDiv} />
                </Col>
                <Col>
                    <Item itemName="Empty Bottle" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / widthDiv} />
                    <p style={{ fontSize: 'xx-large', position: 'relative', left: '20px', bottom: '-15%', color: this.props.colorScheme.text }}>{this.props.logic.getItem('Empty Bottle')}</p>
                </Col>
                <Col>
                    <Item itemName="Life Tree Fruit" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / widthDiv} />
                </Col>
            </Row>
        );
    }
}

AdditionalItems.propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};
export default AdditionalItems;
