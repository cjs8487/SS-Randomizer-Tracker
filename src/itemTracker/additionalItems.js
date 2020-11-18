import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SeaChart from './items/additional/seaChart'

class AdditionalItems extends React.Component {
    render() {
        return (
            <Row>
                <Col>
                    <SeaChart current={this.props.items.seaChart} styleProps={this.props.styleProps} onChange={this.props.handleItemClick}/>
                </Col>
            </Row>
        )
    }
}
export default AdditionalItems