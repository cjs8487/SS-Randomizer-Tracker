import React from 'react';
import noSoth from '../../assets/songs/No_Soth.png'
import soth1 from '../../assets/songs/SOTH1.png'
import soth2 from '../../assets/songs/SOTH2.png'
import soth3 from '../../assets/songs/SOTH3.png'
import soth4 from '../../assets/songs/SOTH4.png'

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
                    <img src={soth1} onClick={this.handleClick} alt={"Soth"}/>
                </div>
            case 2:
                return <div id={"Soth-item"}>
                    <img src={soth2} onClick={this.handleClick} alt={"Soth"}/>
                </div>
            case 3:
                return <div id={"Soth-item"}>
                    <img src={soth3} onClick={this.handleClick} alt={"Soth"}/>
                </div>
            case 4:
                return <div id={"Soth-item"}>
                    <img src={soth4} onClick={this.handleClick} alt={"Soth"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("soth")
    }
}
