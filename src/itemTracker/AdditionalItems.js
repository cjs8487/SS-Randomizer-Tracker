import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Item from './Item';

import noCavesKey from '../assets/dungeons/noSmallKey.png';
import cavesKey from '../assets/dungeons/1_smallKey.png';
import noSeaChart from '../assets/no_sea_chart.png';
import seaChart from '../assets/sea_chart.png';
import noSpiralCharge from '../assets/no_bird_statuette.png';
import spiralCharge from '../assets/bird_statuette.png';
import noPouch from '../assets/no_pouch.png';
import pouch from '../assets/pouch.png';
import noBottle from '../assets/no_bottle.png';
import bottle from '../assets/bottle.png';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

class AdditionalItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };
        this.cavesKeyImages = [
            noCavesKey,
            cavesKey,
        ];
        this.chartImages = [
            noSeaChart,
            seaChart,
        ];
        this.spiralChargeImages = [
            noSpiralCharge,
            spiralCharge,
        ];
        this.pouchImages = [
            noPouch,
            pouch,
        ];
        this.bottleIamges = [
            noBottle,
            bottle,
            bottle,
            bottle,
            bottle,
            bottle,
        ];
    }

    componentDidMount() {
        this.setState({ width: this.divElement.clientWidth });
    }

    render() {
        let { width } = this.state;
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }
        return (
            <Row
                ref={(divElement) => { this.divElement = divElement; }}
                noGutters="true"
            >
                {this.props.keysanity && (
                        <Col>
                            <p style={{ margin: 0, fontSize: 'small', color: this.props.colorScheme.text }}>Caves</p>
                            <Item itemName="LanayruCaves Small Key" images={this.cavesKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / 5} />
                        </Col>
                    )
                }
                <Col>
                    <Item itemName="Sea Chart" images={this.chartImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / 5} />
                </Col>
                <Col>
                    <Item itemName="Spiral Charge" images={this.spiralChargeImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / 5} />
                </Col>
                <Col>
                    <Item itemName="Progressive Pouch" images={this.pouchImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / 5} />
                </Col>
                <Col>
                    <Item itemName="Empty Bottle" images={this.bottleIamges} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={width / 5} />
                    <p style={{ fontSize: 'xx-large', position: 'relative', left: '25px', bottom: '0%', color: this.props.colorScheme.text }}>{this.props.logic.getItem('Empty Bottle')}</p>
                </Col>
            </Row>
        );
    }
}

AdditionalItems.propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    keysanity: PropTypes.bool.isRequired,
};
export default AdditionalItems;
