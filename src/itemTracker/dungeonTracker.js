import React from 'react';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import dungeonLayout from '../assets/dungeonLayout.png'

import ST_Name from './items/stName';
import ET_Name from './items/etName';
import LMF_Name from './items/lmfName';
import AC_Name from './items/acName';
import SSH_Name from './items/sshName';
import FS_Name from './items/fsName';
import SK_Name from './items/skName';
import ST_BossKey from './items/stBossKey';
import ET_BossKey from './items/etBossKey';
import LMF_BossKey from './items/lmfBossKey';
import AC_BossKey from './items/acBossKey';
import SSH_BossKey from './items/sshBossKey';
import FS_BossKey from './items/fsBossKey';
import Triforce from './items/triforce';
import ST_Small from './items/stSmall';
import ET_Entry from './items/etEntry';
import LMF_Small from './items/lmfSmall';
import AC_Small from './items/acSmall';
import SSH_Small from './items/sshSmall';
import FS_Small from './items/fsSmall';
import SK_Small from './items/skSmall';

export default class DungeonTracker extends React.Component{
    MAX_BK;
    MAX_TRIFORCE;
    MAX_ST_SMALL;
    MAX_ET_ENTRY;
    MAX_LMF_SMALL;
    MAX_AC_SMALL;
    MAX_SSH_SMALL;
    MAX_FS_SMALL;
    MAX_SK_SMALL;

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.MAX_BK = 1;
        this.MAX_TRIFORCE = 3;
        this.MAX_ST_SMALL = 2;
        this.MAX_ET_ENTRY = 5;
        this.MAX_LMF_SMALL = 1;
        this.MAX_AC_SMALL = 2;
        this.MAX_SSH_SMALL = 2;
        this.MAX_FS_SMALL = 3;
        this.MAX_SK_SMALL = 1;

        this.state = {
            items: {
                stName: 0,
                etName: 0,
                lmfName: 0,
                acName: 0,
                sshName: 0,
                fsName: 0,
                skName: 0,
                stBossKey: 0,
                etBossKey: 0,
                lmfBossKey: 0,
                acBossKey: 0,
                sshBossKey: 0,
                fsBossKey: 0,
                triforce: 0,
                stSmall: 0,
                stSmall_1: 0,
                stSmall_2: 0,
                etEntry: 0,
                lmfSmall: 0,
                acSmall: 0,
                acSmall_1: 0,
                acSmall_2: 0,
                sshSmall: 0,
                sshSmall_1: 0,
                sshSmall_2: 0,
                fsSmall: 0,
                fsSmall_1: 0,
                fsSmall_2: 0,
                fsSmall_3: 0,
                skSmall: 0,

            },
        };

    }

    render() {
        let wid = this.props.style.width
        let hig = this.props.style.height

        const stNameStyle = {
            position: 'relative',
            left: 1.5*wid/8
        }

        const etNameStyle = {
            position: 'relative',
            left: 2.5*wid/8
        }

        const lmfNameStyle = {
            position: 'relative',
            left: 3.5*wid/8
        }

        const acNameStyle = {
            position: 'relative',
            left: 4.5*wid/8
        }

        const sshNameStyle = {
            position: 'relative',
            left: 5.5*wid/8
        }

        const fsNameStyle = {
            position: 'relative',
            left: 6.5*wid/8
        }

        const skNameStyle = {
            position: 'relative',
            left: 7.5*wid/8
        }

        const stBossKeyStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 1.5*wid/8
        }

        const etBossKeyStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 2.5*wid/8,
        }

        const lmfBossKeyStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 3.5*wid/8,
        }

        const acBossKeyStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 4.5*wid/8,
        }

        const sshBossKeyStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 5.5*wid/8,
        }

        const fsBossKeyStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 6.5*wid/8,
        }

        const triforceStyle = {
            position: 'relative',
            bottom: 2*hig/4,
            left: 7.5*wid/8,
        }

        const stSmallStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 1.5*wid/8,
        }

        const etEntryStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 2.5*wid/8,
        }

        const lmfSmallStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 3.5*wid/8,
        }

        const acSmallStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 4.5*wid/8,
        }

        const sshSmallStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 5.5*wid/8,
        }

        const fsSmallStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 6.5*wid/8,
        }

        const skSmallStyle = {
            position: 'relative',
            bottom: 3*hig/4,
            left: 7.5*wid/8,
        }

        const stChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 1.5*wid/8
        }

        const etChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 2.5*wid/8
        }

        const lmfChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 3.5*wid/8
        }

        const acChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 4.5*wid/8
        }

        const sshChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 5.5*wid/8
        }

        const fsChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 6.5*wid/8
        }

        const skChecksStyle = {
            position: 'relative',
            bottom: hig,
            left: 7.5*wid/8
        }


        return  <div id={"DungeonTracker"}>
                <img src={dungeonLayout} alt={""} width={wid}/>
                <Container>
                    <Row>
                        <div id={"stName"} style={stNameStyle}>
                            <ST_Name current={this.state.items.stName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"etName"} style={etNameStyle}>
                            <ET_Name current={this.state.items.etName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"lmfName"} style={lmfNameStyle}>
                            <LMF_Name current={this.state.items.lmfName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"acName"} style={acNameStyle}>
                            <AC_Name current={this.state.items.acName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"sshName"} style={sshNameStyle}>
                            <SSH_Name current={this.state.items.sshName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"fsName"} style={fsNameStyle}>
                            <FS_Name current={this.state.items.fsName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"skName"} style={skNameStyle}>
                            <SK_Name current={this.state.items.skName} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                    </Row>
                    <Row>
                        <div id={"stBossKey"} style={stBossKeyStyle}>
                            <ST_BossKey current={this.state.items.stBossKey} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"etBossKey"} style={etBossKeyStyle}>
                            <ET_BossKey current={this.state.items.etBossKey} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"lmfBossKey"} style={lmfBossKeyStyle}>
                            <LMF_BossKey current={this.state.items.lmfBossKey} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"acBossKey"} style={acBossKeyStyle}>
                            <AC_BossKey current={this.state.items.acBossKey} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"sshBossKey"} style={sshBossKeyStyle}>
                            <SSH_BossKey current={this.state.items.sshBossKey} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"fsBossKey"} style={fsBossKeyStyle}>
                            <FS_BossKey current={this.state.items.fsBossKey} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"triforce"} style={triforceStyle}>
                            <Triforce current={this.state.items.triforce} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                    </Row>
                    <Row>  
                        <div id={"stSmall"} style={stSmallStyle}>
                            <ST_Small current={this.state.items.stSmall} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"etEntry"} style={etEntryStyle}>
                            <ET_Entry current={this.state.items.etEntry} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"lmfSmall"} style={lmfSmallStyle}>
                            <LMF_Small current={this.state.items.lmfSmall} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"acSmall"} style={acSmallStyle}>
                            <AC_Small current={this.state.items.acSmall} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"sshSmall"} style={sshSmallStyle}>
                        <SSH_Small current={this.state.items.sshSmall} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"fsSmall"} style={fsSmallStyle}>
                           <FS_Small current={this.state.items.fsSmall} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                        <div id={"skSmall"} style={skSmallStyle}>
                            <SK_Small current={this.state.items.skSmall} parent={this.props.style} onChange={this.handleUpdate}/>
                        </div>
                    </Row>
                    </Container>
                </div>
                /*
                I have no idea how to implement this, sorry
                    <div id={"stChecks"} style={stChecksStyle}>
                        <ST_Checks/>
                    </div>
                    <div id={"etChecks"} style={etChecksStyle}>
                        <ET_Checks/>
                    </div>
                    <div id={"lmfChecks"} style={lmfChecksStyle}>
                        <LMF_Checks/>
                    </div>
                    <div id={"acChecks"} style={acChecksStyle}>
                        <AC_Checks/>
                    </div>
                    <div id={"sshChecks"} style={sshChecksStyle}>
                        <SSH_Checks/>
                    </div>
                    <div id={"fsChecks"} style={fsChecksStyle}>
                        <FS_Checks/>
                    </div>
                    <div id={"skChecks"} style={skChecksStyle}>
                        <SK_Checks/>
                    </div>
                */
    }

    handleClick() {

    }

    handleUpdate(item){
        switch(item){
            case "stName":
                this.setState({items: this.setItemState("stName", this.state.items.stName < this.MAX_BK ? this.state.items.stName + 1 : 0)});
                return;
            case "etName":
                this.setState({items: this.setItemState("etName", this.state.items.etName < this.MAX_BK ? this.state.items.etName + 1 : 0)});
                return;
            case "lmfName":
                this.setState({items: this.setItemState("lmfName", this.state.items.lmfName < this.MAX_BK ? this.state.items.lmfName + 1 : 0)});
                return;
            case "acName":
                this.setState({items: this.setItemState("acName", this.state.items.acName < this.MAX_BK ? this.state.items.acName + 1 : 0)});
                return;
            case "sshName":
                this.setState({items: this.setItemState("sshName", this.state.items.sshName < this.MAX_BK ? this.state.items.sshName + 1 : 0)});
                return;
            case "fsName":
                this.setState({items: this.setItemState("fsName", this.state.items.fsName < this.MAX_BK ? this.state.items.fsName + 1 : 0)});
                return;
            case "skName":
                this.setState({items: this.setItemState("skName", this.state.items.skName < this.MAX_BK ? this.state.items.skName + 1 : 0)});
                return;
            case "stBossKey":
                this.setState({items: this.setItemState("stBossKey", this.state.items.stBossKey < this.MAX_BK ? this.state.items.stBossKey + 1 : 0)});
                return;
            case "etBossKey":
                this.setState({items: this.setItemState("etBossKey", this.state.items.etBossKey < this.MAX_BK ? this.state.items.etBossKey + 1 : 0)});
                return;
            case "lmfBossKey":
                this.setState({items: this.setItemState("lmfBossKey", this.state.items.lmfBossKey < this.MAX_BK ? this.state.items.lmfBossKey + 1 : 0)});
                return;
            case "acBossKey":
                this.setState({items: this.setItemState("acBossKey", this.state.items.acBossKey < this.MAX_BK ? this.state.items.acBossKey + 1 : 0)});
                return;
            case "sshBossKey":
                this.setState({items: this.setItemState("sshBossKey", this.state.items.sshBossKey < this.MAX_BK ? this.state.items.sshBossKey + 1 : 0)});
                return;
            case "fsBossKey":
                this.setState({items: this.setItemState("fsBossKey", this.state.items.fsBossKey < this.MAX_BK ? this.state.items.fsBossKey + 1 : 0)});
                return;
            case "triforce":
                this.setState({items: this.setItemState("triforce", this.state.items.triforce < this.MAX_TRIFORCE ? this.state.items.triforce + 1 : 0)});
                return;
            case "stSmall":
                this.setState({items: this.setItemState("stSmall", this.state.items.stSmall < this.MAX_ST_SMALL ? this.state.items.stSmall + 1 : 0)});
                //this.setState({items: this.setItemState("stSmall_1", this.state.items.stSmall === 1 ? 1 : 0)});
                //this.setState({items: this.setItemState("stSmall_2", this.state.items.stSmall === 2 ? 1 : 0)});
                return;
            case "etEntry":
                this.setState({items: this.setItemState("etEntry", this.state.items.etEntry < this.MAX_ET_ENTRY ? this.state.items.etEntry + 1 : 0)})
                return;
            case "lmfSmall":
                this.setState({items: this.setItemState("lmfSmall", this.state.items.lmfSmall < this.MAX_LMF_SMALL ? this.state.items.lmfSmall + 1 : 0)});
                return;
            case "acSmall":
                this.setState({items: this.setItemState("acSmall", this.state.items.acSmall < this.MAX_AC_SMALL ? this.state.items.acSmall + 1 : 0)});
                return;
            case "sshSmall":
                this.setState({items: this.setItemState("sshSmall", this.state.items.sshSmall < this.MAX_SSH_SMALL ? this.state.items.sshSmall + 1 : 0)});
                return;
            case "fsSmall":
                this.setState({items: this.setItemState("fsSmall", this.state.items.fsSmall < this.MAX_FS_SMALL ? this.state.items.fsSmall + 1 : 0)});
                return;
            case "skSmall":
                this.setState({items: this.setItemState("skSmall", this.state.items.skSmall < this.MAX_SK_SMALL ? this.state.items.skSmall + 1 : 0)});
                return;
        }
    }

    setItemState(item, state) {
        const newItems = Object.assign({}, this.state.items);
        newItems[item] = state;
        this.props.updateLogic(item, state);
        return newItems;
    }
}
