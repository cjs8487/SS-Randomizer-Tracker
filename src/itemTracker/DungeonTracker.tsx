import { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import {
    DungeonClickCallback,
    GroupClickCallback,
    ItemClickCallback,
} from '../callbacks';

type DungeonTrackerProps = {
    skyKeep: boolean;
    logic: Logic;
    handleDungeonUpdate: DungeonClickCallback;
    colorScheme: ColorScheme;
    handleItemClick: ItemClickCallback;
    groupClicked: GroupClickCallback;
    entranceRando: string;
    trialRando: boolean;
};

const DungeonTracker = (props: DungeonTrackerProps) => {
    const [width, setWidth] = useState(0);
    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        setWidth(divRef?.current?.clientWidth || 0);
    }, [setWidth, divRef]);

    const smallKeyImages = [
        noSmallKey,
        oneSmallKey,
        twoSmallKey,
        threeSmallKey,
    ];
    const dungeonEnteredImages = [noEntrance, entrance];

    const numDungeons = props.skyKeep ? 7 : 6;
    const iconsPerDungeon = props.entranceRando === 'None' ? 2 : 3;
    const colWidth = width / (numDungeons * iconsPerDungeon);
    const secondRowWidth = width / 4;
    return (
        <Col noGutters id="dungeonTracker" ref={divRef}>
            <Row noGutters>
                {props.entranceRando !== 'None' && (
                    <Col id="svEntrance">
                        <Item
                            itemName="Entered Skyview"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col id="svSmall">
                    <Item
                        itemName="Skyview Small Key"
                        images={smallKeyImages}
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                <Col id="svBossKey">
                    <Item
                        itemName="Skyview Boss Key"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                {props.entranceRando !== 'None' && (
                    <Col>
                        <Item
                            itemName="Entered Earth Temple"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col id="etEntry">
                    <Item
                        itemName="Key Piece"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                <Col id="etBossKey">
                    <Item
                        itemName="Earth Temple Boss Key"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                {props.entranceRando !== 'None' && (
                    <Col>
                        <Item
                            itemName="Entered Lanayru Mining Facility"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col id="lmfSmall">
                    <Item
                        itemName="Lanayru Mining Facility Small Key"
                        images={smallKeyImages}
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                <Col id="lmfBossKey">
                    <Item
                        itemName="Lanayru Mining Facility Boss Key"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                {props.entranceRando !== 'None' && (
                    <Col>
                        <Item
                            itemName="Entered Ancient Cistern"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col id="acSmall">
                    <Item
                        itemName="Ancient Cistern Small Key"
                        images={smallKeyImages}
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                <Col id="acBossKey">
                    <Item
                        itemName="Ancient Cistern Boss Key"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                {props.entranceRando !== 'None' && (
                    <Col>
                        <Item
                            itemName="Entered Sandship"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col id="sshSmall">
                    <Item
                        itemName="Sandship Small Key"
                        images={smallKeyImages}
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                <Col id="sshBossKey">
                    <Item
                        itemName="Sandship Boss Key"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                {props.entranceRando !== 'None' && (
                    <Col>
                        <Item
                            itemName="Entered Fire Sanctuary"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col id="fsSmall">
                    <Item
                        itemName="Fire Sanctuary Small Key"
                        images={smallKeyImages}
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                <Col id="fsBossKey">
                    <Item
                        itemName="Fire Sanctuary Boss Key"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={colWidth}
                        ignoreItemClass
                    />
                </Col>
                {props.skyKeep && (
                    <>
                        {props.entranceRando === 'Dungeons   Sky Keep' && (
                            <Col>
                                <Item
                                    itemName="Entered Sky Keep"
                                    images={dungeonEnteredImages}
                                    logic={props.logic}
                                    onChange={props.handleItemClick}
                                    imgWidth={colWidth}
                                    ignoreItemClass
                                />
                            </Col>
                        )}
                        <Col id="skSmall">
                            <Item
                                itemName="Sky Keep Small Key"
                                images={smallKeyImages}
                                logic={props.logic}
                                onChange={props.handleItemClick}
                                imgWidth={colWidth}
                                ignoreItemClass
                            />
                        </Col>
                        <Col id="stoneOfTrials">
                            <Item
                                itemName="Stone of Trials"
                                logic={props.logic}
                                onChange={props.handleItemClick}
                                imgWidth={colWidth}
                                ignoreItemClass
                            />
                        </Col>
                    </>
                )}
            </Row>
            <Row noGutters>
                <Col id="svName" className="dungeonName">
                    <DungeonName
                        dungeon="SV"
                        dungeonName="Skyview"
                        logic={props.logic}
                        dungeonChange={props.handleDungeonUpdate}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="etName" className="dungeonName">
                    <DungeonName
                        dungeon="ET"
                        dungeonName="Earth Temple"
                        logic={props.logic}
                        dungeonChange={props.handleDungeonUpdate}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="lmfName" className="dungeonName">
                    <DungeonName
                        dungeon="LMF"
                        dungeonName="Lanayru Mining Facility"
                        logic={props.logic}
                        dungeonChange={props.handleDungeonUpdate}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="acName" className="dungeonName">
                    <DungeonName
                        dungeon="AC"
                        dungeonName="Ancient Cistern"
                        logic={props.logic}
                        dungeonChange={props.handleDungeonUpdate}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="sshName" className="dungeonName">
                    <DungeonName
                        dungeon="SSH"
                        dungeonName="Sandship"
                        logic={props.logic}
                        dungeonChange={props.handleDungeonUpdate}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="fsName" className="dungeonName">
                    <DungeonName
                        dungeon="FS"
                        dungeonName="Fire Sanctuary"
                        logic={props.logic}
                        dungeonChange={props.handleDungeonUpdate}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                {props.skyKeep && (
                    <Col id="skName" className="dungeonName">
                        <DungeonName
                            dungeon="SK"
                            dungeonName="Sky Keep"
                            logic={props.logic}
                            dungeonChange={props.handleDungeonUpdate}
                            colorScheme={props.colorScheme}
                        />
                    </Col>
                )}
            </Row>
            <Row noGutters>
                <Col>
                    <DungeonIcon
                        image={g1}
                        iconLabel="Ghirahim 1"
                        area="Skyview"
                        width={colWidth * iconsPerDungeon}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={scaldera}
                        iconLabel="Scaldera"
                        area="Earth Temple"
                        width={colWidth * iconsPerDungeon}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={moldarach}
                        iconLabel="Moldarach"
                        area="Lanayru Mining Facility"
                        width={colWidth * iconsPerDungeon}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={koloktos}
                        iconLabel="Koloktos"
                        area="Ancient Cistern"
                        width={colWidth * iconsPerDungeon}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={tentalus}
                        iconLabel="Tentalus"
                        area="Sandship"
                        width={colWidth * iconsPerDungeon}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={g2}
                        iconLabel="Ghirahim 2"
                        area="Fire Sanctuary"
                        width={colWidth * iconsPerDungeon}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                {props.skyKeep && (
                    <Col id="skChecks">
                        <DungeonIcon
                            image={dreadfuse}
                            iconLabel="Dreadfuse"
                            area="Sky Keep"
                            width={colWidth * iconsPerDungeon}
                            groupClicked={props.groupClicked}
                        />
                    </Col>
                )}
            </Row>

            <Row noGutters>
                <Col id="svChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Skyview',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Skyview',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="etChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Earth Temple',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Earth Temple',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="lmfChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Lanayru Mining Facility',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Lanayru Mining Facility',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="acChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Ancient Cistern',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Ancient Cistern',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="sshChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Sandship',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Sandship',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="fsChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Fire Sanctuary',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Fire Sanctuary',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                {props.skyKeep && (
                    <Col id="skChecks">
                        <AreaCounters
                            totalChecksLeftInArea={props.logic.getTotalCountForArea(
                                'Sky Keep',
                            )}
                            totalChecksAccessible={props.logic.getInLogicCountForArea(
                                'Sky Keep',
                            )}
                            colorScheme={props.colorScheme}
                        />
                    </Col>
                )}
            </Row>
            <Row noGutters>
                {props.trialRando && (
                    <Col>
                        <Item
                            itemName="Entered Skyloft Silent Realm"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {props.trialRando && (
                    <Col>
                        <Item
                            itemName="Entered Faron Silent Realm"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {props.trialRando && (
                    <Col>
                        <Item
                            itemName="Entered Lanayru Silent Realm"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
                {props.trialRando && (
                    <Col>
                        <Item
                            itemName="Entered Eldin Silent Realm"
                            images={dungeonEnteredImages}
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={colWidth}
                            ignoreItemClass
                        />
                    </Col>
                )}
                <Col>
                    <HintMarker width={secondRowWidth / 4} />
                </Col>
            </Row>
            <Row noGutters>
                <Col>
                    <DungeonIcon
                        image={trialGate}
                        iconLabel="Skyloft Silent Realm"
                        area="Skyloft Silent Realm"
                        width={secondRowWidth}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={faronTrialGate}
                        iconLabel="Faron Silent Realm"
                        area="Faron Silent Realm"
                        width={secondRowWidth}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={lanayruTrialGate}
                        iconLabel="Lanayru Silent Realm"
                        area="Lanayru Silent Realm"
                        width={secondRowWidth}
                        groupClicked={props.groupClicked}
                    />
                </Col>
                <Col>
                    <DungeonIcon
                        image={eldinTrialGate}
                        iconLabel="Eldin Silent Realm"
                        area="Eldin Silent Realm"
                        width={secondRowWidth}
                        groupClicked={props.groupClicked}
                    />
                </Col>
            </Row>
            <Row noGutters>
                <Col id="skyloftTrialChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Skyloft Silent Realm',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Skyloft Silent Realm',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="faronTrialChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Faron Silent Realm',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Faron Silent Realm',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="lanayruTrialChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Lanayru Silent Realm',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Lanayru Silent Realm',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>

                <Col id="eldinTrialChecks">
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(
                            'Eldin Silent Realm',
                        )}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(
                            'Eldin Silent Realm',
                        )}
                        colorScheme={props.colorScheme}
                    />
                </Col>
            </Row>
        </Col>
    );
};

export default DungeonTracker;
