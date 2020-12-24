import React from 'react';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import dungeonLayout from '../assets/dungeonLayout.png'
import AreaCounters from '../locationTracker/AreaCounters'

import ST_BossKey from './items/dungeons/bk/stBossKey';
import ET_BossKey from './items/dungeons/bk/etBossKey';
import LMF_BossKey from './items/dungeons/bk/lmfBossKey';
import AC_BossKey from './items/dungeons/bk/acBossKey';
import SSH_BossKey from './items/dungeons/bk/sshBossKey';
import FS_BossKey from './items/dungeons/bk/fsBossKey';
import Triforce from './items/dungeons/triforce';
import ST_Small from './items/dungeons/small/stSmall';
import ET_Entry from './items/dungeons/etEntry';
import LMF_Small from './items/dungeons/small/lmfSmall';
import AC_Small from './items/dungeons/small/acSmall';
import SSH_Small from './items/dungeons/small/sshSmall';
import FS_Small from './items/dungeons/small/fsSmall';
import SK_Small from './items/dungeons/small/skSmall';
import DungeonName from './items/dungeons/dungeonName';

export default class DungeonTracker extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            width: 0
        }
    }

    componentDidMount() {
        this.setState({width: this.divElement.clientWidth})
    }

    render() {
        let width = this.state.width;
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }

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

        console.log("Width: %d", width)
        let numDungeons = this.props.skykeep ? 7 : 6
        let colWidth = width / numDungeons
        console.log("Column width: %d", colWidth)

        return ( 
            <Col id="dungeonTracker"
                ref={ (divElement) => { this.divElement = divElement } }
            >
                <Row noGutters>
                    
                    <Col id={"stName"} className="dungeonName" style={stNameStyle}>
                        <DungeonName 
                            dungeon="ST"
                            dungeonName="Skyview"
                            current={this.props.items.stName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Skyview")}
                        />
                    </Col>
                    
                    
                    <Col id={"etName"} className="dungeonName"  style={etNameStyle}>
                        <DungeonName 
                            dungeon="ET" dungeonName="Earth Temple" 
                            current={this.props.items.etName}
                            parent={this.props.styleProps} 
                            onChange={this.props.handleItemClick}d
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Earth Temple")}
                        />
                    </Col>
                    
                    
                    <Col id={"lmfName"} className="dungeonName"  style={lmfNameStyle}>
                        <DungeonName 
                            dungeon="LMF" 
                            dungeonName="Lanayru Mining Facility" 
                            current={this.props.items.lmfName} 
                            parent={this.props.styleProps} 
                            onChange={this.props.handleItemClick} 
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Lanayru Mining Facility")}
                        />
                    </Col>
                    
                    
                    <Col id={"acName"} className="dungeonName"  style={acNameStyle}>
                        <DungeonName 
                            dungeon="AC" 
                            dungeonName="Ancient Cistern"
                            current={this.props.items.acName} 
                            parent={this.props.styleProps} 
                            onChange={this.props.handleItemClick} 
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Ancient Cistern")}
                        />
                    </Col>
                    
                    
                    <Col id={"sshName"} className="dungeonName"  style={sshNameStyle}>
                        <DungeonName 
                            dungeon="SSH" 
                            dungeonName="Sandship" 
                            current={this.props.items.sshName} 
                            parent={this.props.styleProps} 
                            onChange={this.props.handleItemClick} 
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Sandship")}
                        />
                    </Col>
                    
                    
                    <Col id={"fsName"} className="dungeonName"  style={fsNameStyle}>
                        <DungeonName 
                            dungeon="FS" 
                            dungeonName="Fire Sanctuary" 
                            current={this.props.items.fsName} 
                            parent={this.props.styleProps} 
                            onChange={this.props.handleItemClick} 
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Fire Sanctuary")}
                        />
                    </Col>
                    
                    
                    {this.props.skykeep &&
                        <Col id={"skName"} className="dungeonName"  style={skNameStyle}>
                            <DungeonName
                                dungeon="SK"
                                dungeonName="Skykeep" 
                                current={this.props.items.skName} 
                                parent={this.props.styleProps} 
                                onChange={this.props.handleItemClick} 
                                dungeonChange={this.props.handleDungeonUpdate}
                                complete={this.props.completedDungeons.includes("Sky Keep")}
                            />
                        </Col>
                    }
                    
                </Row>
                <Row noGutters>
                    
                    <Col id={"stBossKey"} style={stBossKeyStyle}>
                        <ST_BossKey current={this.props.items.stBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth}/>
                    </Col>
                    
                    
                    <Col id={"etBossKey"} style={etBossKeyStyle}>
                        <ET_BossKey current={this.props.items.etBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"lmfBossKey"} style={lmfBossKeyStyle}>
                        <LMF_BossKey current={this.props.items.lmfBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"acBossKey"} style={acBossKeyStyle}>
                        <AC_BossKey current={this.props.items.acBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"sshBossKey"} style={sshBossKeyStyle}>
                        <SSH_BossKey current={this.props.items.sshBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"fsBossKey"} style={fsBossKeyStyle}>
                        <FS_BossKey current={this.props.items.fsBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    {this.props.skykeep && 
                        <Col id={"triforce"} style={triforceStyle}>
                            <Triforce current={this.props.items.triforce} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                        </Col>
                    }
                    
                </Row>
                <Row noGutters>  
                    
                    <Col id={"stSmall"} style={stSmallStyle}>
                        <ST_Small current={this.props.items.stSmall} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"etEntry"} style={etEntryStyle}>
                        <ET_Entry current={this.props.items.etEntry} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"lmfSmall"} style={lmfSmallStyle}>
                        <LMF_Small current={this.props.items.lmfSmall} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"acSmall"} style={acSmallStyle}>
                        <AC_Small current={this.props.items.acSmall} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"sshSmall"} style={sshSmallStyle}>
                    <SSH_Small current={this.props.items.sshSmall} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    <Col id={"fsSmall"} style={fsSmallStyle}>
                        <FS_Small current={this.props.items.fsSmall} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                    </Col>
                    
                    
                    {this.props.skykeep && 
                        <Col id={"skSmall"} style={skSmallStyle}>
                            <SK_Small current={this.props.items.skSmall} parent={this.props.styleProps} onChange={this.props.handleItemClick}/>
                        </Col>
                    }
                    
                </Row>
                <Row noGutters>
                    
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
                    
                    
                    {this.props.skykeep && 
                        <Col id={"skChecks"} style={skChecksStyle}>
                            <AreaCounters totalChecksLeftInArea = {this.props.checksPerLocation['Sky Keep']} totalChecksAccessible = {this.props.accessiblePerLocation['Sky Keep']}/> 
                        </Col>
                    }
                    
                </Row>
            </Col>
        )
    }
}
