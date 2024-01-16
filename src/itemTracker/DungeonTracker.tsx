import { CSSProperties, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useResizeObserver from '@react-hook/resize-observer';

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
import Logic from '../logic/Logic';
import DungeonIcon from './items/dungeons/DungeonIcon';
import HintMarker from '../hints/HintMarker';
import { DungeonClickCallback, ItemClickCallback, GroupClickCallback } from '../callbacks';

type DungeonTrackerProps = {
    skyKeep: boolean;
    logic: Logic;
    handleDungeonUpdate: DungeonClickCallback;
    handleItemClick: ItemClickCallback;
    groupClicked: GroupClickCallback;
    entranceRando: string;
    trialRando: boolean;
};

export default function DungeonTracker(props: DungeonTrackerProps) {
    const [width, setWidth] = useState(0);
    const divElement = useRef<HTMLDivElement>(null);

    useResizeObserver(divElement, () => {
        const elem = divElement.current;
        if (!elem) {
            return;
        }
        setWidth(divElement.current.clientWidth)
    });

    const smallKeyImages = [
        noSmallKey,
        oneSmallKey,
        twoSmallKey,
        threeSmallKey,
    ];
    const dungeonEnteredImages = [noEntrance, entrance];
    const numDungeons = props.skyKeep ? 7 : 6;
    const iconsPerDungeon = props.entranceRando === 'None' ? 2 : 3;
    // scale icons differently with ER / sky keep to keep things fitted all at once
    const scaleFactor = (props.skyKeep ? 1.05 : 1) * (props.entranceRando !== 'None' ? 1.03 : 1) * 1.15;
    const colWidth = width / (numDungeons * iconsPerDungeon * scaleFactor);
    const secondRowWidth = width / 4;
    const keysStyle: CSSProperties = {
        position: 'relative',
        margin: '-2%',
        left: '3%',
    };
    const dungeonStyle: CSSProperties = {
        position: 'relative',
        top: width * -0.015,
    };
    const bossStyle: CSSProperties = {
        position: 'relative',
        top: width * -0.05,
    };
    const dungeonCheckStyle: CSSProperties = {
        position: 'relative',
        top: width * -0.05,
    };
    const trialStyle: CSSProperties = {
        position: 'relative',
        margin: '0.5%',
        left: '-1.5%',
        top: '-2%',
    };
    const trialHintStyle: CSSProperties = {
        position: 'relative',
        margin: '0.5%',
        left: '2%',
        top: '-2%',
    };
    const trialCheckStyle: CSSProperties = {
        position: 'relative',
        margin: '0.5%',
        left: '2%',
        top: '-2%',
    };

    return (
        <Col
            noGutters
            // style={{ padding: 0 }}
            id="dungeonTracker"
            ref={divElement}
        >
            <table style={keysStyle}>
                <td>
                    <tr>
                        {
                            props.entranceRando !== 'None' && (
                                <td id="svEntrance">
                                    <Item itemName="Entered Skyview" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            )
                        }
                        <td id="svSmall">
                            <Item itemName="Skyview Small Key" images={smallKeyImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="svBossKey">
                            <Item itemName="Skyview Boss Key" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="SV"
                                dungeonName="Skyview"
                                logic={props.logic}
                                dungeonChange={props.handleDungeonUpdate}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={bossStyle}>
                            <DungeonIcon image={g1} iconLabel="Ghirahim 1" area="Skyview" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                            <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Skyview')} totalChecksAccessible={props.logic.getInLogicCountForArea('Skyview')} />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            props.entranceRando !== 'None' && (
                                <td id="etEntrance">
                                    <Item itemName="Entered Earth Temple" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            )
                        }
                        <td id="etSmall">
                            <Item itemName="Key Piece" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="etBossKey">
                            <Item itemName="Earth Temple Boss Key" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="ET"
                                dungeonName="Earth Temple"
                                logic={props.logic}
                                dungeonChange={props.handleDungeonUpdate}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={bossStyle}>
                            <DungeonIcon image={scaldera} iconLabel="Scaldera" area="Earth Temple" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                            <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Earth Temple')} totalChecksAccessible={props.logic.getInLogicCountForArea('Earth Temple')} />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            props.entranceRando !== 'None' && (
                                <td id="lmfEntrance">
                                    <Item itemName="Entered Lanayru Mining Facility" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            )
                        }
                        <td id="lmfSmall">
                            <Item itemName="Lanayru Mining Facility Small Key" images={smallKeyImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="lmfBossKey">
                            <Item itemName="Lanayru Mining Facility Boss Key" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="LMF"
                                dungeonName="Lanayru Mining Facility"
                                logic={props.logic}
                                dungeonChange={props.handleDungeonUpdate}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={bossStyle}>
                            <DungeonIcon image={moldarach} iconLabel="Moldarach" area="Lanayru Mining Facility" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                            <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Lanayru Mining Facility')} totalChecksAccessible={props.logic.getInLogicCountForArea('Lanayru Mining Facility')} />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            props.entranceRando !== 'None' && (
                                <td id="acEntrance">
                                    <Item itemName="Entered Ancient Cistern" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            )
                        }
                        <td id="acSmall">
                            <Item itemName="Ancient Cistern Small Key" images={smallKeyImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="acBossKey">
                            <Item itemName="Ancient Cistern Boss Key" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="AC"
                                dungeonName="Ancient Cistern"
                                logic={props.logic}
                                dungeonChange={props.handleDungeonUpdate}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={bossStyle}>
                            <DungeonIcon image={koloktos} iconLabel="Koloktos" area="Ancient Cistern" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                            <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Ancient Cistern')} totalChecksAccessible={props.logic.getInLogicCountForArea('Ancient Cistern')} />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            props.entranceRando !== 'None' && (
                                <td id="sshEntrance">
                                    <Item itemName="Entered Sandship" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            )
                        }
                        <td id="sshSmall">
                            <Item itemName="Sandship Small Key" images={smallKeyImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="sshBossKey">
                            <Item itemName="Sandship Boss Key" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="SSH"
                                dungeonName="Sandship"
                                logic={props.logic}
                                dungeonChange={props.handleDungeonUpdate}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={bossStyle}>
                            <DungeonIcon image={tentalus} iconLabel="Tentalus" area="Sandship" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                            <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Sandship')} totalChecksAccessible={props.logic.getInLogicCountForArea('Sandship')} />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            props.entranceRando !== 'None' && (
                                <td id="fsEntrance">
                                    <Item itemName="Entered Fire Sanctuary" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            )
                        }
                        <td id="fsSmall">
                            <Item itemName="Fire Sanctuary Small Key" images={smallKeyImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="fsBossKey">
                            <Item itemName="Fire Sanctuary Boss Key" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="FS"
                                dungeonName="Fire Sanctuary"
                                logic={props.logic}
                                dungeonChange={props.handleDungeonUpdate}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={bossStyle}>
                            <DungeonIcon image={g2} iconLabel="Ghirahim 2" area="Fire Sanctuary" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonCheckStyle}>
                            <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Fire Sanctuary')} totalChecksAccessible={props.logic.getInLogicCountForArea('Fire Sanctuary')} />
                        </td>
                    </tr>
                </td>
                {
                    props.skyKeep && (
                        <td>
                            <tr>
                                {
                                    props.entranceRando === 'All Surface Dungeons + Sky Keep' && (
                                        <td id="skEntrance">
                                            <Item itemName="Entered Sky Keep" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                        </td>
                                    )
                                }
                                <td id="skSmall">
                                    <Item itemName="Sky Keep Small Key" images={smallKeyImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                                <td id="stoneTrials">
                                    <Item itemName="Stone of Trials" logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={props.entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={dungeonStyle}>
                                    <DungeonName
                                        dungeon="SK"
                                        dungeonName="Sky Keep"
                                        logic={props.logic}
                                        dungeonChange={props.handleDungeonUpdate}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={props.entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={bossStyle}>
                                    <DungeonIcon image={dreadfuse} iconLabel="Dreadfuse" area="Sky Keep" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={props.entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={dungeonCheckStyle}>
                                    <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Sky Keep')} totalChecksAccessible={props.logic.getInLogicCountForArea('Sky Keep')} />
                                </td>
                            </tr>
                        </td>
                    )
                }
            </table>
            <Row noGutters style={trialHintStyle}>
                {
                    props.trialRando && (
                        <Col>
                            <Item itemName="Entered Skyloft Silent Realm" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {
                    props.trialRando && (
                        <Col>
                            <Item itemName="Entered Faron Silent Realm" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {
                    props.trialRando && (
                        <Col>
                            <Item itemName="Entered Lanayru Silent Realm" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {
                    props.trialRando && (
                        <Col>
                            <Item itemName="Entered Eldin Silent Realm" images={dungeonEnteredImages} logic={props.logic} onChange={props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
            </Row>
            <Row noGutters style={trialStyle}>
                <Col>
                    <DungeonIcon image={trialGate} iconLabel="Skyloft Silent Realm" area="Skyloft Silent Realm" width={secondRowWidth} groupClicked={props.groupClicked} />
                </Col>
                <Col>
                    <DungeonIcon image={faronTrialGate} iconLabel="Faron Silent Realm" area="Faron Silent Realm" width={secondRowWidth} groupClicked={props.groupClicked} />
                </Col>
                <Col>
                    <DungeonIcon image={lanayruTrialGate} iconLabel="Lanayru Silent Realm" area="Lanayru Silent Realm" width={secondRowWidth} groupClicked={props.groupClicked} />
                </Col>
                <Col>
                    <DungeonIcon image={eldinTrialGate} iconLabel="Eldin Silent Realm" area="Eldin Silent Realm" width={secondRowWidth} groupClicked={props.groupClicked} />
                </Col>
            </Row>
            <Row noGutters style={trialCheckStyle}>
                <Col id="skyloftTrialChecks">
                    <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Skyloft Silent Realm')} totalChecksAccessible={props.logic.getInLogicCountForArea('Skyloft Silent Realm')} />
                </Col>

                <Col id="faronTrialChecks">
                    <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Faron Silent Realm')} totalChecksAccessible={props.logic.getInLogicCountForArea('Faron Silent Realm')} />
                </Col>

                <Col id="lanayruTrialChecks">
                    <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Lanayru Silent Realm')} totalChecksAccessible={props.logic.getInLogicCountForArea('Lanayru Silent Realm')} />
                </Col>

                <Col id="eldinTrialChecks">
                    <AreaCounters totalChecksLeftInArea={props.logic.getTotalCountForArea('Eldin Silent Realm')} totalChecksAccessible={props.logic.getInLogicCountForArea('Eldin Silent Realm')} />
                </Col>
            </Row>
        </Col>
    );
}
