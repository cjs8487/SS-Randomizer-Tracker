import React from 'react';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AreaCounters from '../locationTracker/AreaCounters'
import Item from './Item'

import noSmallKey from '../assets/dungeons/noSmallKey.png'
import oneSmallKey from '../assets/dungeons/SS_Small_Key_Icon.png'
import twoSmallKey from '../assets/dungeons/2_smallKey.png'
import threeSmallKey from '../assets/dungeons/3_smallKey.png'
import noKeyPiece from '../assets/dungeons/et_noEntryPieces.png'
import oneKeyPiece from '../assets/dungeons/SS_Piece_of_the_Key_Icon.png'
import twoKeyPiece from '../assets/dungeons/et_2piece.png'
import threeKeyPiece from '../assets/dungeons/et_3piece.png'
import fourKeyPiece from '../assets/dungeons/et_4piece.png'
import fiveKeyPiece from '../assets/dungeons/SS_Pieces_of_the_Key_Icon.png'
import check from '../assets/Entrance.png'
import cross from '../assets/No_Entrance.png'
import noSVBK from '../assets/dungeons/sv_noBossKey.png'
import svBK from '../assets/dungeons/SS_Golden_Carving_Icon.png'
import noETBK from '../assets/dungeons/et_noBossKey.png'
import etBK from '../assets/dungeons/SS_Dragon_Sculpture_Icon.png'
import noLMFBK from '../assets/dungeons/lmf_noBossKey.png'
import lmfBK from '../assets/dungeons/SS_Ancient_Circuit_Icon.png'
import noACBK from '../assets/dungeons/ac_noBossKey.png'
import acBK from '../assets/dungeons/SS_Blessed_Idol_Icon.png'
import noSSHBK from '../assets/dungeons/ssh_noBossKey.png'
import sshBK from '../assets/dungeons/SS_Squid_Carving_Icon.png'
import noFSBK from '../assets/dungeons/fs_noBossKey.png'
import fsBK from '../assets/dungeons/SS_Mysterious_Crystals_Icon.png'
import noTriforce from '../assets/dungeons/noTriforce.png'
import oneTriforce from '../assets/dungeons/TriforcePiece.png'
import twoTriforce from '../assets/dungeons/2_TriforcePiece.png'
import threeTriforce from '../assets/dungeons/3_TriforcePiece.png'
import DungeonName from './items/dungeons/dungeonName';

export default class DungeonTracker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            width: 0
        }
        this.smallKeyImages = [
            noSmallKey,
            oneSmallKey,
            twoSmallKey,
            threeSmallKey,
        ];
        this.keyPieceImages = [
            noKeyPiece,
            oneKeyPiece,
            twoKeyPiece,
            threeKeyPiece,
            fourKeyPiece,
            fiveKeyPiece,
        ];
        this.dungeonEnteredImages = [
            cross,
            check,
        ];
        this.svBKImages = [
            noSVBK,
            svBK,
        ];
        this.etBKImages = [
            noETBK,
            etBK,
        ];
        this.lmfBKImages = [
            noLMFBK,
            lmfBK,
        ];
        this.acBKImages = [
            noACBK,
            acBK,
        ];
        this.sshBKImages = [
            noSSHBK,
            sshBK,
        ];
        this.fsBKImages = [
            noFSBK,
            fsBK,
        ];
        this.triforceImages = [
            noTriforce,
            oneTriforce,
            twoTriforce,
            threeTriforce,
        ];
    }

    componentDidMount() {
        this.setState({ width: this.divElement.clientWidth })
    }

    render() {
        let width = this.state.width;
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }

        const svNameStyle = {
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

        const svBossKeyStyle = {
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

        const svSmallStyle = {
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

        const svChecksStyle = {
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

        let numDungeons = this.props.skykeep ? 7 : 6
        let colWidth = width / numDungeons
        console.log(colWidth)

        return (
            <Col id="dungeonTracker"
                ref={(divElement) => { this.divElement = divElement }}
            >
                <Row noGutters>

                    <Col id={"svName"} className="dungeonName" style={svNameStyle}>
                        <DungeonName
                            dungeon="SV"
                            dungeonName="Skyview"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Skyview")}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>


                    <Col id={"etName"} className="dungeonName" style={etNameStyle}>
                        <DungeonName
                            dungeon="ET" dungeonName="Earth Temple"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Earth Temple")}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>


                    <Col id={"lmfName"} className="dungeonName" style={lmfNameStyle}>
                        <DungeonName
                            dungeon="LMF"
                            dungeonName="Lanayru Mining Facility"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Lanayru Mining Facility")}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>


                    <Col id={"acName"} className="dungeonName" style={acNameStyle}>
                        <DungeonName
                            dungeon="AC"
                            dungeonName="Ancient Cistern"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Ancient Cistern")}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>


                    <Col id={"sshName"} className="dungeonName" style={sshNameStyle}>
                        <DungeonName
                            dungeon="SSH"
                            dungeonName="Sandship"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Sandship")}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>


                    <Col id={"fsName"} className="dungeonName" style={fsNameStyle}>
                        <DungeonName
                            dungeon="FS"
                            dungeonName="Fire Sanctuary"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes("Fire Sanctuary")}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>


                    {this.props.skykeep &&
                        <Col id={"skName"} className="dungeonName" style={skNameStyle}>
                            <DungeonName
                                dungeon="SK"
                                dungeonName="Skykeep"
                                logic={this.props.logic}
                                parent={this.props.styleProps}
                                dungeonChange={this.props.handleDungeonUpdate}
                                complete={this.props.completedDungeons.includes("Sky Keep")}
                                colorScheme={this.props.colorScheme}
                            />
                        </Col>
                    }

                </Row>
                {this.props.entranceRando !== "None" &&
                    <Row noGutters>
                        <Col id={"svEntrance"} style={svNameStyle}>
                            <Item itemName="Entered Skyview" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>

                        <Col id={"etEntrance"} style={etNameStyle}>
                            <Item itemName="Entered Earth Temple" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>

                        <Col id={"lmfEntrance"} style={lmfNameStyle}>
                            <Item itemName="Entered Lanayru Mining Facility" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>

                        <Col id={"acEntrance"} style={acNameStyle}>
                            <Item itemName="Entered Ancient Cistern" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>

                        <Col id={"ssEntrance"} style={sshNameStyle}>
                            <Item itemName="Entered Sandship" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>

                        <Col id={"fsEntrance"} style={fsNameStyle}>
                            <Item itemName="Entered Fire Sanctuary" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>

                        {/* this is not a typo */}
                        {this.props.entranceRando === "Dungeons   Sky Keep" && this.props.skykeep &&
                            <Col id={"skEntrance"} style={skNameStyle}>
                                <Item itemName="Entered Skykeep" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                            </Col>
                        }
                        {this.props.entranceRando !== "Dungeons   Sky Keep" && this.props.skykeep &&
                            <Col id={"skEntranceBuffer"} style={skNameStyle}></Col>
                        }

                    </Row>
                }
                <Row noGutters>
                    <Col id={"svBossKey"} style={svBossKeyStyle}>
                        <Item itemName="SW Boss Key" images={this.svBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"etBossKey"} style={etBossKeyStyle}>
                        <Item itemName="ET Boss Key" images={this.etBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"lmfBossKey"} style={lmfBossKeyStyle}>
                        <Item itemName="LMF Boss Key" images={this.lmfBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"acBossKey"} style={acBossKeyStyle}>
                        <Item itemName="AC Boss Key" images={this.acBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"sshBossKey"} style={sshBossKeyStyle}>
                        <Item itemName="SS Boss Key" images={this.sshBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"fsBossKey"} style={fsBossKeyStyle}>
                        <Item itemName="FS Boss Key" images={this.fsBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    {this.props.skykeep &&
                        <Col id={"triforce"} style={triforceStyle}>
                            <Item itemName="Triforce" images={this.triforceImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>
                    }

                </Row>
                <Row noGutters>

                    <Col id={"svSmall"} style={svSmallStyle}>
                        <Item itemName="SW Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"etEntry"} style={etEntryStyle}>
                        <Item itemName="Key Piece" images={this.keyPieceImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"lmfSmall"} style={lmfSmallStyle}>
                        <Item itemName="LMF Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"acSmall"} style={acSmallStyle}>
                        <Item itemName="AC Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"sshSmall"} style={sshSmallStyle}>
                        <Item itemName="SS Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    <Col id={"fsSmall"} style={fsSmallStyle}>
                        <Item itemName="FS Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                    </Col>
                    {this.props.skykeep &&
                        <Col id={"skSmall"} style={skSmallStyle}>
                            <Item itemName="SK Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass={true} />
                        </Col>
                    }
                </Row>
                <Row noGutters>

                    <Col id={"svChecks"} style={svChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Skyview')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Skyview')} colorScheme={this.props.colorScheme} />
                    </Col>


                    <Col id={"etChecks"} style={etChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Earth Temple')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Earth Temple')} colorScheme={this.props.colorScheme} />
                    </Col>


                    <Col id={"lmfChecks"} style={lmfChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Lanayru Mining Facility')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Lanayru Mining Facility')} colorScheme={this.props.colorScheme} />
                    </Col>


                    <Col id={"acChecks"} style={acChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Ancient Cistern')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Ancient Cistern')} colorScheme={this.props.colorScheme} />
                    </Col>


                    <Col id={"sshChecks"} style={sshChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Sandship')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Sandship')} colorScheme={this.props.colorScheme} />
                    </Col>


                    <Col id={"fsChecks"} style={fsChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Fire Sanctuary')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Fire Sanctuary')} colorScheme={this.props.colorScheme} />
                    </Col>


                    {this.props.skykeep &&
                        <Col id={"skChecks"} style={skChecksStyle}>
                            <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Skykeep')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Skykeep')} colorScheme={this.props.colorScheme} />
                        </Col>
                    }

                </Row>
            </Col>
        )
    }
}
