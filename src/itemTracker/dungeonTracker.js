import React from 'react';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import dungeonLayout from '../assets/dungeonLayout.png'
import AreaCounters from '../locationTracker/AreaCounters'

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
        let wid = this.props.styleProps.width
        let hig = this.props.styleProps.height

        const stNameStyle = {
            // position: 'relative',
            // left: 1*wid/7
        }

        const etNameStyle = {
            // position: 'relative',
            // left: 1*wid/7
        }

        const lmfNameStyle = {
            // position: 'relative',
            // left: 2*wid/7
        }

        const acNameStyle = {
            // position: 'relative',
            // left: 3*wid/7
        }

        const sshNameStyle = {
            // position: 'relative',
            // left: 4*wid/7
        }

        const fsNameStyle = {
            // position: 'relative',
            // left: 5*wid/7
        }

        const skNameStyle = {
            // position: 'relative',
            // left: 6*wid/7
        }

        const stBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 1*wid/7
        }

        const etBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 1*wid/7,
        }

        const lmfBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 2*wid/7,
        }

        const acBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 3*wid/7,
        }

        const sshBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 4*wid/7,
        }

        const fsBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 5*wid/7,
        }

        const triforceStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 6*wid/7,
        }

        const stSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: wid/7,
            // width: wid/7
        }

        const etEntryStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 2*wid/7,
            // width: wid/7
        }

        const lmfSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 4*wid/7,
            // width: wid/7
        }

        const acSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 7*wid/7,
            // width: wid/7
        }

        const sshSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 7*wid/7,
            // width: wid/7
        }

        const fsSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 6*wid/7,
            // width: wid/7
        }

        const skSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 7*wid/7,
            // width: wid/7
        }

        const stChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 1*wid/7,
            // width: wid/7
        }

        const etChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 2*wid/7
        }

        const lmfChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 3*wid/7
        }

        const acChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 4*wid/7
        }

        const sshChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 5*wid/7
        }

        const fsChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 6*wid/7
        }

        const skChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 7*wid/7
        }


        return  <div id={"DungeonTracker"}>
                {/* <Container> */}
                {/* <img src={dungeonLayout} alt={""} width={wid}/> */}
                    <Row>
                        
                        <Col id={"stName"} style={stNameStyle}>
                            <ST_Name current={this.state.items.stName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"etName"} style={etNameStyle}>
                            <ET_Name current={this.state.items.etName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"lmfName"} style={lmfNameStyle}>
                            <LMF_Name current={this.state.items.lmfName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"acName"} style={acNameStyle}>
                            <AC_Name current={this.state.items.acName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"sshName"} style={sshNameStyle}>
                            <SSH_Name current={this.state.items.sshName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"fsName"} style={fsNameStyle}>
                            <FS_Name current={this.state.items.fsName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"skName"} style={skNameStyle}>
                            <SK_Name current={this.state.items.skName} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                    </Row>
                    <Row>
                        
                        <Col id={"stBossKey"} style={stBossKeyStyle}>
                            <ST_BossKey current={this.state.items.stBossKey} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"etBossKey"} style={etBossKeyStyle}>
                            <ET_BossKey current={this.state.items.etBossKey} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"lmfBossKey"} style={lmfBossKeyStyle}>
                            <LMF_BossKey current={this.state.items.lmfBossKey} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"acBossKey"} style={acBossKeyStyle}>
                            <AC_BossKey current={this.state.items.acBossKey} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"sshBossKey"} style={sshBossKeyStyle}>
                            <SSH_BossKey current={this.state.items.sshBossKey} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"fsBossKey"} style={fsBossKeyStyle}>
                            <FS_BossKey current={this.state.items.fsBossKey} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"triforce"} style={triforceStyle}>
                            <Triforce current={this.state.items.triforce} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                    </Row>
                    <Row>  
                        
                        <Col id={"stSmall"} style={stSmallStyle}>
                            <ST_Small current={this.state.items.stSmall} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"etEntry"} style={etEntryStyle}>
                            <ET_Entry current={this.state.items.etEntry} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"lmfSmall"} style={lmfSmallStyle}>
                            <LMF_Small current={this.state.items.lmfSmall} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"acSmall"} style={acSmallStyle}>
                            <AC_Small current={this.state.items.acSmall} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"sshSmall"} style={sshSmallStyle}>
                        <SSH_Small current={this.state.items.sshSmall} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"fsSmall"} style={fsSmallStyle}>
                           <FS_Small current={this.state.items.fsSmall} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                        
                        <Col id={"skSmall"} style={skSmallStyle}>
                            <SK_Small current={this.state.items.skSmall} parent={this.props.styleProps} onChange={this.handleUpdate}/>
                        </Col>
                        
                    </Row>
                    <Row>
                        
                        <Col id={"stChecks"} style={stChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Skyview']} totalChecksAccessible = {this.props.accessiblePerLocation['Skyview']}/>
                        </Col>
                        
                        
                        <Col id={"etChecks"} style={etChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Earth Temple']} totalChecksAccessible = {this.props.accessiblePerLocation['Earth Temple']}/>
                        </Col>
                        
                        
                        <Col id={"lmfChecks"} style={lmfChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Lanayru Mining Facility']} totalChecksAccessible = {this.props.accessiblePerLocation['Lanayru Mining Facility']}/>
                        </Col>
                        
                        
                        <Col id={"acChecks"} style={acChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Ancient Cistern']} totalChecksAccessible = {this.props.accessiblePerLocation['Ancient Cistern']}/>    
                        </Col>
                        
                        
                        <Col id={"sshChecks"} style={sshChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Sandship']} totalChecksAccessible = {this.props.accessiblePerLocation['Sandship']}/> 
                        </Col>
                        
                        
                        <Col id={"fsChecks"} style={fsChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Fire Sanctuary']} totalChecksAccessible = {this.props.accessiblePerLocation['Fire Sanctuary']}/>   
                        </Col>
                        
                        
                        <Col id={"skChecks"} style={skChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Sky Keep']} totalChecksAccessible = {this.props.accessiblePerLocation['Sky Keep']}/> 
                        </Col>
                        
                    </Row>
                    {/* </Container> */}
                </div>
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
            default:
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
