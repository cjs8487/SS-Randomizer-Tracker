import React from 'react';
import noMitts from '../../assets/main quest/No_Mitts.png'
import diggingMitts from '../../assets/main quest/Digging_Mitts.png'
import mogmaMitts from '../../assets/main quest/Mogma_Mitts.png'

export default class Mitts extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent

        switch (current) {
            case 0:
                return <div id={"Mitts-item"}>
                    <img src={noMitts} onClick={this.handleClick} alt={"No Mitts"} width={parent.width/5.2}/>
                </div>
            case 1:
                return <div id={"Mitts-item"}>
                    <img src={diggingMitts} onClick={this.handleClick} alt={"Mitts"} width={parent.width/5.2}/>
                </div>
            case 2:
                return <div id={"Mitts-item"}>
                <img src={mogmaMitts} onClick={this.handleClick} alt={"Mitts"} width={parent.width/5.2}/>
            </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("mitts")
        this.props.handleItemClick();
    }
}
