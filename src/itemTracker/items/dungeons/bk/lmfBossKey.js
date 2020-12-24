import React from 'react';
import BK from '../../../../assets/dungeons/SS_Ancient_Circuit_Icon.png'
import No_BK from '../../../../assets/dungeons/lmf_noBossKey.png'

export default class LMF_BossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"LMF-BK"}>
                    <img src={No_BK} onClick={this.handleClick} alt={"No LMF Boss Key"}/>
                </div>
            case 1:
                return <div id={"LMF-BK"}>
                    <img src={BK} onClick={this.handleClick} alt={"LMF Boss Key"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("lmfBossKey")
    }
}