import { relative } from 'path'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import questItemBlock from '../assets/quest_items_block.png'
import Letter from './items/sidequest/letter'
import Rattle from './items/sidequest/rattle'

class QuestItems extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        this.setState({height: this.divElement.clientHeight})
    }

    render() {
        let width = this.props.styleProps.width;
        let height = this.state.height;
        if (this.divElement !== undefined) {
            height = this.divElement.clientHeight;
        }
        console.log(height)
        const letterStyle = {
            position: 'relative',
            bottom: height/3.1,
            left: width/14,
            border: "3px solid green"
        }
        const cBeetleStyle = {
            top: "35%",
            border: "3px solid red"
        }
        const rattleStyle = {
            position: 'relative',
            bottom: 2*height/3.2,
            left: width/1.87,
            border: "3px solid blue"
        }
        const crystalStyle = {
            top: "35%",
            border: "3px solid orange"
        }
        return (
            <div id="quest-items" style={{border: "3px solid black"}}
                ref={ (divElement) => { this.divElement = divElement } }
            >
                <img src={questItemBlock} alt="" width={width} />
                {/* <div
                    style={{
                        width: this.props.styleProps.width,
                        height: "100%",
                        backgroundImage: `url(${questItemBlock})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",

                }}> */}
                    <div style={letterStyle}>   
                        <Letter 
                            current={this.props.items.letter}
                            onChange={this.props.handleItemClick}
                            styleProps={this.props.styleProps}
                        />
                    </div>
                    <Col style={cBeetleStyle}>
                        {/* <Letter current={this.props.items.letter} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/> */}
                    </Col>
                    <div style={rattleStyle}>
                        <Rattle current={this.props.items.rattle} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/>
                    </div>
                    <Col style={crystalStyle}>
                        {/* <Letter current={this.props.items.letter} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/> */}
                    </Col>
                </div>
            // </div>
        );
    }
}

export default QuestItems;