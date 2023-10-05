import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Stack } from 'react-bootstrap';
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
        // scale icons differently with ER / sky keep to keep things fitted all at once
        const scaleFactor = (this.props.skyKeep ? 1.05 : 1) * (this.props.entranceRando !== 'None' ? 1.03 : 1) * 1.15;
        const colWidth = width / (numDungeons * iconsPerDungeon * scaleFactor);
        const secondRowWidth = width / 4;
        const keysStyle = {
            position: 'relative',
            margin: '-2%',
            left: '3%',
        };
        const dungeonStyle = {
            position: 'relative',
            top: width * -0.015,
        };
        const bossStyle = {
            position: 'relative',
            top: width * -0.05,
        };
        const dungeonCheckStyle = {
            position: 'relative',
            top: width * -0.05,
        };
        const trialStyle = {
            position: 'relative',
            margin: '0.5%',
            left: '-1.5%',
            top: '-2%',
        };
        const trialHintStyle = {
            position: 'relative',
            margin: '0.5%',
            left: '2%',
            top: '-2%',
        };
        const trialCheckStyle = {
            position: 'relative',
            margin: '0.5%',
            left: '2%',
            top: '-2%',
        };
        const keyColStyle = {
            width: '25%',
        };
        return (
            <Col
                noGutters
                // style={{ padding: 0 }}
                id="dungeonTracker"
                ref={(divElement) => { this.divElement = divElement; }}
            >
                <table style={keysStyle}>
                    <td>
                        <tr>
                            {
                                this.props.entranceRando !== 'None' && (
                                    <td id="svEntrance">
                                        <Item itemName="Entered Skyview" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                )
                            }
                            <td id="svSmall">
                                <Item itemName="Skyview Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="svBossKey">
                                <Item itemName="Skyview Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="SV"
                                    dungeonName="Skyview"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                    groupClicked={this.props.groupClicked}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={bossStyle}>
                                <DungeonIcon image={g1} iconLabel="Ghirahim 1" area="Skyview" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Skyview')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Skyview')} colorScheme={this.props.colorScheme} />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            {
                                this.props.entranceRando !== 'None' && (
                                    <td id="etEntrance">
                                        <Item itemName="Entered Earth Temple" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                )
                            }
                            <td id="etSmall">
                                <Item itemName="Key Piece" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="etBossKey">
                                <Item itemName="Earth Temple Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="ET"
                                    dungeonName="Earth Temple"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                    groupClicked={this.props.groupClicked}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={bossStyle}>
                                <DungeonIcon image={scaldera} iconLabel="Scaldera" area="Earth Temple" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Earth Temple')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Earth Temple')} colorScheme={this.props.colorScheme} />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            {
                                this.props.entranceRando !== 'None' && (
                                    <td id="lmfEntrance">
                                        <Item itemName="Entered Lanayru Mining Facility" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                )
                            }
                            <td id="lmfSmall">
                                <Item itemName="Lanayru Mining Facility Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="lmfBossKey">
                                <Item itemName="Lanayru Mining Facility Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="LMF"
                                    dungeonName="Lanayru Mining Facility"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                    groupClicked={this.props.groupClicked}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={bossStyle}>
                                <DungeonIcon image={moldarach} iconLabel="Moldarach" area="Lanayru Mining Facility" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Lanayru Mining Facility')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Lanayru Mining Facility')} colorScheme={this.props.colorScheme} />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            {
                                this.props.entranceRando !== 'None' && (
                                    <td id="acEntrance">
                                        <Item itemName="Entered Ancient Cistern" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                )
                            }
                            <td id="acSmall">
                                <Item itemName="Ancient Cistern Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="acBossKey">
                                <Item itemName="Ancient Cistern Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="AC"
                                    dungeonName="Ancient Cistern"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                    groupClicked={this.props.groupClicked}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={bossStyle}>
                                <DungeonIcon image={koloktos} iconLabel="Koloktos" area="Ancient Cistern" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Ancient Cistern')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Ancient Cistern')} colorScheme={this.props.colorScheme} />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            {
                                this.props.entranceRando !== 'None' && (
                                    <td id="sshEntrance">
                                        <Item itemName="Entered Sandship" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                )
                            }
                            <td id="sshSmall">
                                <Item itemName="Sandship Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="sshBossKey">
                                <Item itemName="Sandship Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="SSH"
                                    dungeonName="Sandship"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                    groupClicked={this.props.groupClicked}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={bossStyle}>
                                <DungeonIcon image={tentalus} iconLabel="Tentalus" area="Sandship" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Sandship')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Sandship')} colorScheme={this.props.colorScheme} />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            {
                                this.props.entranceRando !== 'None' && (
                                    <td id="fsEntrance">
                                        <Item itemName="Entered Fire Sanctuary" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                )
                            }
                            <td id="fsSmall">
                                <Item itemName="Fire Sanctuary Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="fsBossKey">
                                <Item itemName="Fire Sanctuary Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="FS"
                                    dungeonName="Fire Sanctuary"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                    groupClicked={this.props.groupClicked}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={bossStyle}>
                                <DungeonIcon image={g2} iconLabel="Ghirahim 2" area="Fire Sanctuary" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Fire Sanctuary')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Fire Sanctuary')} colorScheme={this.props.colorScheme} />
                            </td>
                        </tr>
                    </td>
                    {
                        this.props.skyKeep && (
                            <td>
                                <tr>
                                    {
                                        this.props.entranceRando === 'All Surface Dungeons + Sky Keep' && (
                                            <td id="skEntrance">
                                                <Item itemName="Entered Sky Keep" images={this.dungeonEnteredImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                            </td>
                                        )
                                    }
                                    <td id="skSmall">
                                        <Item itemName="Sky Keep Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                    <td id="stoneTrials">
                                        <Item itemName="Stone of Trials" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={this.props.entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={dungeonStyle}>
                                        <DungeonName
                                            dungeon="SK"
                                            dungeonName="Sky Keep"
                                            logic={this.props.logic}
                                            parent={this.props.styleProps}
                                            dungeonChange={this.props.handleDungeonUpdate}
                                            colorScheme={this.props.colorScheme}
                                            groupClicked={this.props.groupClicked}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={this.props.entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={bossStyle}>
                                        <DungeonIcon image={dreadfuse} iconLabel="Dreadfuse" area="Sky Keep" width={colWidth * iconsPerDungeon} groupClicked={this.props.groupClicked} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={this.props.entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={dungeonCheckStyle}>
                                        <AreaCounters totalChecksLeftInArea={this.props.logic.getTotalCountForArea('Sky Keep')} totalChecksAccessible={this.props.logic.getInLogicCountForArea('Sky Keep')} colorScheme={this.props.colorScheme} />
                                    </td>
                                </tr>
                            </td>
                        )
                    }
                </table>
                <Row noGutters style={trialHintStyle}>
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
                <Row noGutters style={trialStyle}>
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
                <Row noGutters style={trialCheckStyle}>
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
