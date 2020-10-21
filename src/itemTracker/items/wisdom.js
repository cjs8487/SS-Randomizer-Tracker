import React from 'react';
import noWidsom from '../../assets/songs/No_Song.png'
import wisdom from '../../assets/songs/Nayrus_Wisdom.png'

export default class Wisdom extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Wisdom-item"}>
                    <img src={noWidsom} onClick={this.handleClick} alt={"No Wisdom"}/>
                </div>
            case 1:
                return <div id={"Wisdom-item"}>
                    <img src={wisdom} onClick={this.handleClick} alt={"Wisdom"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("wisdom")
    }
}
