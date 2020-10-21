import React from 'react';
import noSoth from '../../assets/songs/No_Song.png'
import soth from '../../assets/songs/Song_of_the_Hero.png'

export default class Soth extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Soth-item"}>
                    <img src={noSoth} onClick={this.handleClick} alt={"No Soth"}/>
                </div>
            case 1:
                return <div id={"Soth-item"}>
                    <img src={soth} onClick={this.handleClick} alt={"Soth"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("soth")
    }
}
