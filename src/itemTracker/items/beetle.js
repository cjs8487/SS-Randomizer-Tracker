import React from 'react';
import noBeetle from '../../assets/Beetle_Silhouette.png'
import beetle from '../../assets/Beetle_Icon.png'
import hookBeetle from '../../assets/Hook_Beetle_Icon.png'

export default class Beetle extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Beetle-item"}>
                    <img src={noBeetle} onClick={this.handleClick} alt={"No Beetle"}/>
                </div>
            case 1:
                return <div id={"Beetle-item"}>
                    <img src={beetle} onClick={this.handleClick} alt={"Beetle"}/>
                </div>
            case 2:
                return <div id={"Beetle-item"}>
                    <img src={hookBeetle} onClick={this.handleClick} alt={"Hook Beetle"}/>
                </div>
            default:
                return

        }
    }

    handleClick () {
        this.props.onChange("beetle")
    }
}
