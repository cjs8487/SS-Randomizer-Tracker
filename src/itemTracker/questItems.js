import React from 'react'
import { Row, Col } from 'react-bootstrap'
import questItemBlock from '../assets/quest_items_block.png'
import Letter from './items/sidequest/letter'

class QuestItems extends React.Component {

    render() {
        const itemStyle = {
            top: "35%"
        }
        return (
            <div id="quest-items" style={{width: this.props.styleProps.width / 2, height: "100%"}}>
                {/* <img src={questItemBlock} alt="" width={this.props.styleProps.width} /> */}
                <Row
                    style={{
                        width: this.props.styleProps.width,
                        height: "100%",
                        backgroundImage: `url(${questItemBlock})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",

                }}>
                    <Col style={itemStyle}>   
                        <Letter 
                            current={this.props.items.letter}
                            onChange={this.props.handleItemClick}
                            styleProps={this.props.styleProps}
                        />
                    </Col>
                    <Col>
                        {/* <Letter current={this.props.items.letter} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/> */}
                    </Col>
                    <Col>
                        {/* <Letter current={this.props.items.letter} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/> */}
                    </Col>
                    <Col>
                        {/* <Letter current={this.props.items.letter} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/> */}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default QuestItems;