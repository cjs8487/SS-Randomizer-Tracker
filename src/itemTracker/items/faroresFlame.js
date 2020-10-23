import React from 'react';
import noFlame from '../../assets/swords/No_Farores_Flame.png'
import flame from '../../assets/swords/Farores_Flame.png'


export default class FaroresFlame extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch (current) {
            case 0:
                return <div id={"Flame-item"}>
                    <img src={noFlame} onClick={this.handleClick} alt={"Flame"} width={parent.width/4.4}/>
                </div>
            case 1:
            case 2:         
            case 3:      
            case 4:
                return <div id={"Flame-item"}>
                    <img src={flame} onClick={this.handleClick} alt={"Flame"} width={parent.width/4.4}/>
                </div>
            default:
                return

        }
    }

    handleClick () {
        this.props.onChange("sword")
    }
}
