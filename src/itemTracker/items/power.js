import React from 'react';
import noPower from '../../assets/songs/No_Song.png'
import power from '../../assets/songs/Dins_Power.png'

export default class Power extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Power-item"}>
                    <img src={noPower} onClick={this.handleClick} alt={"No Power"}/>
                </div>
            case 1:
                return <div id={"Power-item"}>
                    <img src={power} onClick={this.handleClick} alt={"Power"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("power")
    }
}
