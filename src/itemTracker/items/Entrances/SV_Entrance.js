import React from 'react';
import Check from '../../../assets/Entrance.png'
import Cross from '../../../assets/No_Entrance.png'

export default class SVEntrance extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"SV-Entrance"}>
                    <img src={Cross} onClick={this.handleClick} alt={"No entrance set"}/>
                </div>
            case 1:
                return <div id={"SV-Entrance"}>
                    <img src={Check} onClick={this.handleClick} alt={"Entrance set"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("svEntered")
    }
}