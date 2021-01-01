import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SeaChart from './items/additional/seaChart';
import CavesKey from './items/additional/cavesKey';
import SpiralCharge from './items/additional/spiralCharge';
import Pouch from './items/additional/pouch';
import Bottle from './items/additional/bottle';

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
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }
        const style = {
            // padding: 0,
            // margin:"15px"
        };
        const styleProps = {
            width: width / 5,
        };
        return (
            <Row
                ref={(divElement) => { this.divElement = divElement; }}
                noGutters="true"
          >
                <Col style={style}>
                    <p style={{ margin: 0, fontSize: 'small', color: this.props.colorScheme.text }}>Caves</p>
                    <CavesKey current={this.props.items.cavesKey} styleProps={styleProps} onChange={this.props.handleItemClick} />
              </Col>
                <Col style={style}>
                    <SeaChart current={this.props.items.seaChart} styleProps={styleProps} onChange={this.props.handleItemClick} />
              </Col>
                <Col style={style}>
                    <SpiralCharge current={this.props.items.spiralCharge} styleProps={styleProps} onChange={this.props.handleItemClick} />
              </Col>
                <Col style={style}>
                    <Pouch current={this.props.items.pouch} styleProps={styleProps} onChange={this.props.handleItemClick} />
              </Col>
                <Col style={style}>
                    <Bottle current={this.props.items.bottle} styleProps={styleProps} onChange={this.props.handleItemClick} />
                    <p style={{
                        fontSize: 'xx-large', position: 'relative', left: '25px', bottom: '25px', color: this.props.colorScheme.text,
                    }}
                  >{this.props.items.bottle}
                  </p>
              </Col>
          </Row>
        );
    }
}
export default AdditionalItems;
