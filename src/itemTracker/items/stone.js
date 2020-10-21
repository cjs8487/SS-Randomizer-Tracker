import React from 'react';
import noStone from '../../assets/main quest/No_Stone.png'
import stone from '../../assets/main quest/Stone_of_Trials.png'

export default class Stone extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Stone-item"}>
                    <img src={noStone} onClick={this.handleClick} alt={"No Stone"}/>
                </div>
            case 1:
                return <div id={"Stone-item"}>
                    <img src={stone} onClick={this.handleClick} alt={"Stone"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("stone")
    }
}
