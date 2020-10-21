import React from 'react';
import noCourage from '../../assets/songs/No_Song.png'
import courage from '../../assets/songs/Farores_Courage.png'

export default class Courage extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Courage-item"}>
                    <img src={noCourage} onClick={this.handleClick} alt={"No Courage"}/>
                </div>
            case 1:
                return <div id={"Courage-item"}>
                    <img src={courage} onClick={this.handleClick} alt={"Courage"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("courage")
    }
}
