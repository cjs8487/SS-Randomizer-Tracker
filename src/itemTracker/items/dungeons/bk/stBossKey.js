import React from 'react';
import BK from '../../../../assets/dungeons/SS_Golden_Carving_Icon.png'
import No_BK from '../../../../assets/dungeons/st_noBossKey.png'

export default class ST_BossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"ST-BK"}>
                    <img src={No_BK} onClick={this.handleClick} alt={"No ST Boss Key"} width={this.props.colWidth}/>
                </div>
            case 1:
                return <div id={"ST-BK"}>
                    <img src={BK} onClick={this.handleClick} alt={"ST Boss Key"} width={this.props.colWidth}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("stBossKey")
    }
}