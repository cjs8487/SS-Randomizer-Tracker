import React from 'react';
import noSailcloth from '../../assets/main quest/No_Sailcloth.png'
import sailcloth from '../../assets/main quest/Sailcloth.png'

export default class Sailcloth extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Sailcloth-item"}>
                    <img src={noSailcloth} onClick={this.handleClick} alt={"No Sailcloth"}/>
                </div>
            case 1:
                return <div id={"Sailcloth-item"}>
                    <img src={sailcloth} onClick={this.handleClick} alt={"Sailcloth"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("sailcloth")
    }
}
