import React from 'react';
import BK from '../../../../assets/dungeons/SS_Dragon_Sculpture_Icon.png'
import No_BK from '../../../../assets/dungeons/et_noBossKey.png'

export default class ET_BossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"ET-BK"}>
                    <img src={No_BK} onClick={this.handleClick} alt={"No ET Boss Key"}/>
                </div>
            case 1:
                return <div id={"ET-BK"}>
                    <img src={BK} onClick={this.handleClick} alt={"ET Boss Key"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("etBossKey")
    }
}