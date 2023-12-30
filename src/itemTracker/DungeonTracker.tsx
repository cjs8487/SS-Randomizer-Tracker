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
import DungeonIcon from './items/dungeons/DungeonIcon';
import HintMarker from '../hints/HintMarker';
import DungeonEntranceMarker from './DungeonEntranceMarker';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../state/tracker/Selectors';

type DungeonTrackerProps = {
    groupClicked: (group: string) => void;
};

export default function DungeonTracker(props: DungeonTrackerProps) {
    const [width, setWidth] = useState(0);
    const divElement = useRef<HTMLDivElement>(null);
    const settings = useSelector(settingsSelector);

    const skyKeep = !(settings.getOption('Empty Unrequired Dungeons') && (!settings.getOption('Triforce Required') || settings.getOption('Triforce Shuffle') === 'Anywhere'));
    const entranceRando = settings.getOption('Randomize Entrances');
    const trialRando = settings.getOption('Randomize Silent Realms');

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
    const numDungeons = skyKeep ? 7 : 6;
    const iconsPerDungeon = entranceRando === 'None' ? 2 : 3;
    // scale icons differently with ER / sky keep to keep things fitted all at once
    const scaleFactor = (skyKeep ? 1.05 : 1) * (entranceRando !== 'None' ? 1.03 : 1) * 1.15;
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
                            entranceRando !== 'None' && (
                                <td id="svEntrance">
                                    <DungeonEntranceMarker dungeon="Skyview" imgWidth={colWidth} />
                                </td>
                            )
                        }
                        <td id="svSmall">
                            <Item itemName="Skyview Small Key" images={smallKeyImages} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="svBossKey">
                            <Item itemName="Skyview Boss Key" imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="SV"
                                dungeonName="Skyview"
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
                            <AreaCounters areaName="Skyview" />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            entranceRando !== 'None' && (
                                <td id="etEntrance">
                                    <DungeonEntranceMarker dungeon="Earth Temple" imgWidth={colWidth} />
                                </td>
                            )
                        }
                        <td id="etSmall">
                            <Item itemName="Key Piece" imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="etBossKey">
                            <Item itemName="Earth Temple Boss Key" imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="ET"
                                dungeonName="Earth Temple"
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
                            <AreaCounters areaName="Earth Temple" />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            entranceRando !== 'None' && (
                                <td id="lmfEntrance">
                                    <DungeonEntranceMarker dungeon="Lanayru Mining Facility" imgWidth={colWidth} />
                                </td>
                            )
                        }
                        <td id="lmfSmall">
                            <Item itemName="Lanayru Mining Facility Small Key" images={smallKeyImages} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="lmfBossKey">
                            <Item itemName="Lanayru Mining Facility Boss Key" imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="LMF"
                                dungeonName="Lanayru Mining Facility"
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
                            <AreaCounters areaName="Lanayru Mining Facility" />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            entranceRando !== 'None' && (
                                <td id="acEntrance">
                                    <DungeonEntranceMarker dungeon="Ancient Cistern" imgWidth={colWidth} />
                                </td>
                            )
                        }
                        <td id="acSmall">
                            <Item itemName="Ancient Cistern Small Key" images={smallKeyImages} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="acBossKey">
                            <Item itemName="Ancient Cistern Boss Key" imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="AC"
                                dungeonName="Ancient Cistern"
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
                            <AreaCounters areaName="Ancient Cistern" />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            entranceRando !== 'None' && (
                                <td id="sshEntrance">
                                    <DungeonEntranceMarker dungeon="Sandship" imgWidth={colWidth} />
                                </td>
                            )
                        }
                        <td id="sshSmall">
                            <Item itemName="Sandship Small Key" images={smallKeyImages} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="sshBossKey">
                            <Item itemName="Sandship Boss Key" imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="SSH"
                                dungeonName="Sandship"
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
                            <AreaCounters areaName="Sandship" />
                        </td>
                    </tr>
                </td>
                <td>
                    <tr>
                        {
                            entranceRando !== 'None' && (
                                <td id="fsEntrance">
                                    <DungeonEntranceMarker dungeon="Fire Sanctuary" imgWidth={colWidth} />
                                </td>
                            )
                        }
                        <td id="fsSmall">
                            <Item itemName="Fire Sanctuary Small Key" images={smallKeyImages} imgWidth={colWidth} ignoreItemClass />
                        </td>
                        <td id="fsBossKey">
                            <Item itemName="Fire Sanctuary Boss Key" imgWidth={colWidth} ignoreItemClass />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                            <DungeonName
                                dungeon="FS"
                                dungeonName="Fire Sanctuary"
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
                            <AreaCounters areaName="Fire Sanctuary" />
                        </td>
                    </tr>
                </td>
                {
                    skyKeep && (
                        <td>
                            <tr>
                                {
                                    entranceRando === 'All Surface Dungeons + Sky Keep' && (
                                        <td id="skEntrance">
                                            <DungeonEntranceMarker dungeon="Sky Keep" imgWidth={colWidth} />
                                        </td>
                                    )
                                }
                                <td id="skSmall">
                                    <Item itemName="Sky Keep Small Key" images={smallKeyImages} imgWidth={colWidth} ignoreItemClass />
                                </td>
                                <td id="stoneTrials">
                                    <Item itemName="Stone of Trials" imgWidth={colWidth} ignoreItemClass />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={dungeonStyle}>
                                    <DungeonName
                                        dungeon="SK"
                                        dungeonName="Sky Keep"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={bossStyle}>
                                    <DungeonIcon image={dreadfuse} iconLabel="Dreadfuse" area="Sky Keep" width={colWidth * iconsPerDungeon} groupClicked={props.groupClicked} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={entranceRando === 'All Surface Dungeons + Sky Keep' ? 3 : 2} style={dungeonCheckStyle}>
                                    <AreaCounters areaName="Sky Keep" />
                                </td>
                            </tr>
                        </td>
                    )
                }
            </table>
            <Row noGutters style={trialHintStyle}>
                {
                    trialRando && (
                        <Col>
                            <DungeonEntranceMarker dungeon="Skyloft Silent Realm" imgWidth={colWidth} />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {
                    trialRando && (
                        <Col>
                            <DungeonEntranceMarker dungeon="Faron Silent Realm" imgWidth={colWidth} />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {
                    trialRando && (
                        <Col>
                            <DungeonEntranceMarker dungeon="Lanayru Silent Realm" imgWidth={colWidth} />
                        </Col>
                    )
                }
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {
                    trialRando && (
                        <Col>
                            <DungeonEntranceMarker dungeon="Eldin Silent Realm" imgWidth={colWidth} />
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
                    <AreaCounters areaName="Skyloft Silent Realm" />
                </Col>

                <Col id="faronTrialChecks">
                    <AreaCounters areaName="Faron Silent Realm" />
                </Col>

                <Col id="lanayruTrialChecks">
                    <AreaCounters areaName="Lanayru Silent Realm" />
                </Col>

                <Col id="eldinTrialChecks">
                    <AreaCounters areaName="Eldin Silent Realm" />
                </Col>
            </Row>
        </Col>
    );
}
