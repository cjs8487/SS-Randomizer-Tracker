import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AreaCounters from '../locationTracker/AreaCounters';
import Item from './Item';

import noSmallKey from '../assets/dungeons/noSmallKey.png';
import oneSmallKey from '../assets/dungeons/1_smallKey.png';
import twoSmallKey from '../assets/dungeons/2_smallKey.png';
import threeSmallKey from '../assets/dungeons/3_smallKey.png';
import noEntrance from '../assets/No_Entrance.png';
import entrance from '../assets/Entrance.png';
import g1 from '../assets/bosses/g1.png';
import scaldera from '../assets/bosses/scaldera.png';
import moldarach from '../assets/bosses/moldarach.png';
import koloktos from '../assets/bosses/koloktos.png';
import tentalus from '../assets/bosses/tentalus.png';
import g2 from '../assets/bosses/g2.png';
import dreadfuse from '../assets/bosses/dreadfuse.png';
import trialGate from '../assets/bosses/trialGate.png';
import faronTrialGate from '../assets/bosses/faronTrialGate.png';
import lanayruTrialGate from '../assets/bosses/lanayruTrialGate.png';
import eldinTrialGate from '../assets/bosses/eldinTrialGate.png';
import DungeonName from './items/dungeons/DungeonName';
import ColorScheme from '../customization/ColorScheme';
import Logic from '../logic/Logic';
import DungeonIcon from './items/dungeons/DungeonIcon';
import HintMarker from '../hints/HintMarker';

class DungeonTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };

        this.smallKeyImages = [
            noSmallKey,
            oneSmallKey,
            twoSmallKey,
            threeSmallKey,
        ];
        this.dungeonEnteredImages = [
            noEntrance,
            entrance,
        ];
    }

    componentDidMount() {
        this.setState({ width: this.divElement.clientWidth });
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        let { width } = this.state;
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }

        const numDungeons = this.props.skyKeep ? 7 : 6;
        const iconsPerDungeon = this.props.entranceRando === 'None' ? 2 : 3;
        const colWidth = width / (numDungeons * iconsPerDungeon);
        const secondRowWidth = width / 4;
        return (
            <Col
                noGutters
                // style={{ padding: 0 }}
                id="dungeonTracker"
                ref={(divElement) => { this.divElement = divElement; }}
            >
                <Stack direction="horizontal">
                    {
                        this.props.entranceRando !== 'None' && (
                            <Col id="svEntrance">
                                <Item itemName="Entered Skyview" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </Col>
                        )
                    }
                    <Col id="svSmall">
                        <Item itemName="SV Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    <Col id="svBossKey">
                        <Item itemName="SV Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    {
                        this.props.entranceRando !== 'None' && (
                            <Item itemName="Entered Earth Temple" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                    <Col id="etEntry">
                        <Item itemName="Key Piece" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    <Col id="etBossKey">
                        <Item itemName="ET Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    {
                        this.props.entranceRando !== 'None' && (
                            <Item itemName="Entered Lanayru Mining Facility" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                    <Col id="lmfSmall">
                        <Item itemName="LMF Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    <Col id="lmfBossKey">
                        <Item itemName="LMF Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    {
                        this.props.entranceRando !== 'None' && (
                            <Item itemName="Entered Ancient Cistern" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                    <Col id="acSmall">
                        <Item itemName="AC Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    <Col id="acBossKey">
                        <Item itemName="AC Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    {
                        this.props.entranceRando !== 'None' && (
                            <Item itemName="Entered Sandship" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                    <Col id="sshSmall">
                        <Item itemName="SS Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    <Col id="sshBossKey">
                        <Item itemName="SS Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    {
                        this.props.entranceRando !== 'None' && (
                            <Item itemName="Entered Fire Sanctuary" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                    <Item itemName="FS Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    <Item itemName="FS Boss Key" images={this.fsBKImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    {
                        this.props.skyKeep && this.props.entranceRando !== 'None' && this.props.entranceRando === 'Dungeons   Sky Keep' && this.props.skyKeep && (
                            <Item itemName="Entered Sky Keep" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                    <Col id="fsSmall">
                        <Item itemName="FS Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    <Col id="fsBossKey">
                        <Item itemName="FS Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                    </Col>
                    {
                        this.props.skyKeep && (
                            <Row noGutters>
                                {
                                    this.props.entranceRando !== 'None' && (
                                        <Col id="skEntrance" style={{ width: colWidth, height: colWidth, padding: 0 }}>
                                            {
                                                this.props.entranceRando === 'Dungeons   Sky Keep' && this.props.skyKeep && (
                                                    <Item itemName="Entered Sky Keep" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                                )
                                            }
                                        </Col>
                                    )
                                }
                                <Col id="skSmall">
                                    <Item itemName="SK Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </Col>
                                <Col id="triforce">
                                    <Item itemName="Triforce" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </Col>
                            </Row>
                        )
                    }
                    {
                        this.props.skyKeep && (
                            <Item itemName="Triforce" images={this.triforceImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        )
                    }
                </Stack>
                <Row noGutters>
                    <Col id="svName" className="dungeonName">
                        <DungeonName
                            dungeon="SV"
                            dungeonName="Skyview"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="etName" className="dungeonName">
                        <DungeonName
                            dungeon="ET"
                            dungeonName="Earth Temple"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="lmfName" className="dungeonName">
                        <DungeonName
                            dungeon="LMF"
                            dungeonName="Lanayru Mining Facility"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="acName" className="dungeonName">
                        <DungeonName
                            dungeon="AC"
                            dungeonName="Ancient Cistern"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="sshName" className="dungeonName">
                        <DungeonName
                            dungeon="SSH"
                            dungeonName="Sandship"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="fsName" className="dungeonName">
                        <DungeonName
                            dungeon="FS"
                            dungeonName="Fire Sanctuary"
                            logic={this.props.logic}
                            parent={this.props.styleProps}
                            dungeonChange={this.props.handleDungeonUpdate}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    {
                        this.props.skyKeep && (
                            <Col id="skName" className="dungeonName">
                                <DungeonName
                                    dungeon="SK"
                                    dungeonName="Sky Keep"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </Col>
                        )
                    }
                </Row>
                <Row noGutters>
                    <Col>
                        <DungeonIcon image={g1} iconLabel="Ghirahim 1" area="Skyview" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={scaldera} iconLabel="Scaldera" area="Earth Temple" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={moldarach} iconLabel="Moldarach" area="Lanayru Mining Facility" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={koloktos} iconLabel="Koloktos" area="Ancient Cistern" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={tentalus} iconLabel="Tentalus" area="Sandship" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={g2} iconLabel="Ghirahim 2" area="Fire Sanctuary" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                    </Col>
                    {
                        this.props.skyKeep && (
                            <Col id="skChecks">
                                <DungeonIcon image={dreadfuse} iconLabel="Dreadfuse" area="Sky Keep" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </Col>
                        )
                    }
                </Row>

                <Row noGutters>
                    <Col id="svChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Skyview')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Skyview')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="etChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Earth Temple')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Earth Temple')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="lmfChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Lanayru Mining Facility')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Lanayru Mining Facility')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="acChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Ancient Cistern')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Ancient Cistern')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="sshChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Sandship')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Sandship')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="fsChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Fire Sanctuary')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Fire Sanctuary')} colorScheme={this.props.colorScheme} />
                    </Col>

                    {
                        this.props.skyKeep && (
                            <Col id="skChecks">
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Sky Keep')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Sky Keep')} colorScheme={this.props.colorScheme} />
                            </Col>
                        )
                    }

                </Row>
                <Row noGutters>
                    {
                        this.props.trialRando && (
                            <Col>
                                <Item itemName="Entered Skyloft Silent Realm" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </Col>
                        )
                    }
                    <Col>
                        <HintMarker width={secondRowWidth / 4} />
                    </Col>
                    {
                        this.props.trialRando && (
                            <Col>
                                <Item itemName="Entered Faron Silent Realm" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </Col>
                        )
                    }
                    <Col>
                        <HintMarker width={secondRowWidth / 4} />
                    </Col>
                    {
                        this.props.trialRando && (
                            <Col>
                                <Item itemName="Entered Lanayru Silent Realm" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </Col>
                        )
                    }
                    <Col>
                        <HintMarker width={secondRowWidth / 4} />
                    </Col>
                    {
                        this.props.trialRando && (
                            <Col>
                                <Item itemName="Entered Eldin Silent Realm" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </Col>
                        )
                    }
                    <Col>
                        <HintMarker width={secondRowWidth / 4} />
                    </Col>
                </Row>
                <Row noGutters>
                    <Col>
                        <DungeonIcon image={trialGate} iconLabel="Skyloft Silent Realm" area="Skyloft Silent Realm" width={secondRowWidth} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={faronTrialGate} iconLabel="Faron Silent Realm" area="Faron Silent Realm" width={secondRowWidth} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={lanayruTrialGate} iconLabel="Lanayru Silent Realm" area="Lanayru Silent Realm" width={secondRowWidth} groupClicked={this.props.groupClicked} />
                    </Col>
                    <Col>
                        <DungeonIcon image={eldinTrialGate} iconLabel="Eldin Silent Realm" area="Eldin Silent Realm" width={secondRowWidth} groupClicked={this.props.groupClicked} />
                    </Col>
                </Row>
                <Row noGutters>
                    <Col id="skyloftTrialChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Skyloft Silent Realm')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Skyloft Silent Realm')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="faronTrialChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Faron Silent Realm')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Faron Silent Realm')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="lanayruTrialChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Lanayru Silent Realm')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Lanayru Silent Realm')} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="eldinTrialChecks">
                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Eldin Silent Realm')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Eldin Silent Realm')} colorScheme={this.props.colorScheme} />
                    </Col>
                </Row>
            </Col>
        );
    }
}

DungeonTracker.propTypes = {
    skyKeep: PropTypes.bool.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    styleProps: PropTypes.shape().isRequired,
    handleDungeonUpdate: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    groupClicked: PropTypes.func.isRequired,
    entranceRando: PropTypes.string.isRequired,
    trialRando: PropTypes.bool.isRequired,
};

export default DungeonTracker;
