import React from 'react';
import No_Triforce from '../../assets/dungeons/noTriforce.png'
import Triforce_1 from '../../assets/dungeons/TriforcePiece.png'
import Triforce_2 from '../../assets/dungeons/2_TriforcePiece.png'
import Triforce_3 from '../../assets/dungeons/3_TriforcePiece.png'

export default class Triforce extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"triforce-pieces"}>
                    <img src={No_Triforce} onClick={this.handleClick} alt={"No Triforce Pieces"}/>
                </div>
            case 1:
                return <div id={"triforce-pieces"}>
                    <img src={Triforce_1} onClick={this.handleClick} alt={"1 Triforce Pieces"}/>
                </div>
            case 2:
                return <div id={"triforce-pieces"}>
                    <img src={Triforce_2} onClick={this.handleClick} alt={"2 Triforce Pieces"}/>
                </div>
            case 3:
                return <div id={"triforce-pieces"}>
                    <img src={Triforce_3} onClick={this.handleClick} alt={"3 Triforce Pieces"}/>
                </div>
            default:
                return null
        }
    }

    handleClick() {
        this.props.onChange("triforce")
    }
}