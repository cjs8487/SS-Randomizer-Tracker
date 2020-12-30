import React from 'react';
import BK from '../../../../assets/dungeons/SS_Golden_Carving_Icon.png'
import No_BK from '../../../../assets/dungeons/sv_noBossKey.png'

export default class SV_BossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"SV-BK"}>
                    <img src={No_BK} onClick={this.handleClick} alt={"No SV Boss Key"} width={this.props.colWidth}/>
                </div>
            case 1:
                return <div id={"SV-BK"}>
                    <img src={BK} onClick={this.handleClick} alt={"SV Boss Key"} width={this.props.colWidth}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("svBossKey")
    }
}