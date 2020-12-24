import React from 'react';
import noEntry from '../../../assets/dungeons/et_noEntryPieces.png'
import Entry_1 from '../../../assets/dungeons/SS_Piece_of_the_Key_Icon.png'
import Entry_2 from '../../../assets/dungeons/et_2piece.png'
import Entry_3 from '../../../assets/dungeons/et_3piece.png'
import Entry_4 from '../../../assets/dungeons/et_4piece.png'
import Entry_5 from '../../../assets/dungeons/SS_Pieces_of_the_Key_Icon.png'


export default class ET_Entry extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"ET-entry-key"}>
                    <img src={noEntry} onClick={this.handleClick} alt={"No ET entry key pieces"} width={this.props.colWidth}/>
                </div>
            case 1:
                return <div id={"ET-entry-key"}>
                    <img src={Entry_1} onClick={this.handleClick} alt={"1 ET entry key piece"} width={this.props.colWidth}/>
                </div>
            case 2:
                return <div id={"ET-entry-key"}>
                    <img src={Entry_2} onClick={this.handleClick} alt={"2 ET entry key pieces"} width={this.props.colWidth}/>
                </div>
            case 3:
                return <div id={"ET-entry-key"}>
                    <img src={Entry_3} onClick={this.handleClick} alt={"3 ET entry key pieces"} width={this.props.colWidth}/>
                </div>
            case 4:
                return <div id={"ET-entry-key"}>
                    <img src={Entry_4} onClick={this.handleClick} alt={"4 ET entry key pieces"} width={this.props.colWidth}/>
                </div>
            case 5:
                return <div id={"ET-entry-key"}>
                    <img src={Entry_5} onClick={this.handleClick} alt={"5 ET entry key pieces"} width={this.props.colWidth}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("etEntry")
    }
}