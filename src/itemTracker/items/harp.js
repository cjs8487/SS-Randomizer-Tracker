import React from 'react';
import noHarp from '../../assets/main quest/No_Harp.png'
import harp from '../../assets/main quest/Goddess_Harp.png'

export default class Harp extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent

        switch (current) {
            case 0:
                return <div id={"Harp-item"}>
                    <img src={noHarp} onClick={this.handleClick} alt={"No Harp"} width={parent.width/4.6}/>
                </div>
            case 1:
                return <div id={"Harp-item"}>
                    <img src={harp} onClick={this.handleClick} alt={"Harp"} width={parent.width/4.6}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("harp")
    }
}
