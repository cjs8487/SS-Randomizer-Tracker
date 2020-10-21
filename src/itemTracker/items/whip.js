import React from 'react';
import noWhip from '../../assets/Whip_Silhouette.png'
import whip from '../../assets/Whip_Icon.png'

export default class Whip extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Whip-item"}>
                    <img src={noWhip} onClick={this.handleClick} alt={"No Whip"}/>
                </div>
            case 1:
                return <div id={"Whip-item"}>
                    <img src={whip} onClick={this.handleClick} alt={"Whip"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("whip")
    }
}
