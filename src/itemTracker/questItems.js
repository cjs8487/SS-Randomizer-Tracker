import React from 'react'
import questItemBlock from '../assets/quest_items_block.png'
import CBeetle from './items/sidequest/cBeetle'
import Crystal from './items/sidequest/crystal'
import CrystalCounter from './items/sidequest/crystalCounter'
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
            bottom: height/5.1,
            left: width/14,
        }
        const cBeetleStyle = {
            position: 'relative',
            bottom: height/3.2,
            left: width/3.26,
        }
        const rattleStyle = {
            position: 'relative',
            bottom: height/2.2,
            left: width/1.85,
        }
        const crystalStyle = {
            position: 'relative',
            bottom: height/1.65,
            left: width/1.26,
        }

        const counterStyle = {
            position: 'relative',
            bottom: height/ 1.5,
            left: width/1.1
        }
        return (
            <div id="quest-items"
                ref={ (divElement) => { this.divElement = divElement } }
            >
            <img src={questItemBlock} alt="" width={width} />
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
                <div style={counterStyle}>
                    <CrystalCounter current={this.props.items.crystals} colorScheme={this.props.colorScheme}/>
                </div>
            </div>
        );
    }
}

export default QuestItems;