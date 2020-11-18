import { relative } from 'path'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import questItemBlock from '../assets/quest_items_block.png'
import CBeetle from './items/sidequest/cBeetle'
import Crystal from './items/sidequest/crystal'
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
            bottom: height/4.15,
            left: width/14,
            // border: "3px solid green"
        }
        const cBeetleStyle = {
            position: 'relative',
            bottom: height/2.5,
            left: width/3.26,
            // border: "3px solid red"
        }
        const rattleStyle = {
            position: 'relative',
            bottom: height/1.7,
            left: width/1.85,
            // border: "3px solid blue"
        }
        const crystalStyle = {
            position: 'relative',
            bottom: height/1.31,
            left: width/1.26,
            // border: "3px solid orange"
        }
        return (
            <div id="quest-items"
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
                    <div style={cBeetleStyle}>
                        <CBeetle current={this.props.items.cBeetle} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/>
                    </div>
                    <div style={rattleStyle}>
                        <Rattle current={this.props.items.rattle} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/>
                    </div>
                    <div style={crystalStyle}>
                        <Crystal current={this.props.items.crystals} onChange={this.props.handleItemClick} styleProps={this.props.styleProps}/>
                    </div>
                </div>
            // </div>
        );
    }
}

export default QuestItems;