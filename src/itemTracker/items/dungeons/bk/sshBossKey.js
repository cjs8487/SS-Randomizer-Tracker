import React from 'react';
import BK from '../../../../assets/dungeons/SS_Squid_Carving_Icon.png'
import No_BK from '../../../../assets/dungeons/ssh_noBossKey.png'

export default class SSH_BossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"SSH-BK"}>
                    <img src={No_BK} onClick={this.handleClick} alt={"No SSH Boss Key"}/>
                </div>
            case 1:
                return <div id={"SSH-BK"}>
                    <img src={BK} onClick={this.handleClick} alt={"SSH Boss Key"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){
        this.props.onChange("sshBossKey")
    }
}