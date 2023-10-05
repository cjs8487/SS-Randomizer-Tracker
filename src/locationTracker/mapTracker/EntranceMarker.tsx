import { CSSProperties, MouseEvent, useState, useCallback, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import 'react-contexify/dist/ReactContexify.css';
import { useContextMenu } from 'react-contexify';
import AreaCounters from '../AreaCounters';
import Logic from '../../logic/Logic';
import LogicHelper from '../../logic/LogicHelper';
import ColorScheme from '../../customization/ColorScheme';
import { MarkerClickCallback, HintClickCallback, EntranceBindCallback, CheckAllClickCallback } from '../../callbacks';
import keyDownWrapper from '../../KeyDownWrapper';

import sotsImage from '../../assets/hints/sots.png';
import barrenImage from '../../assets/hints/barren.png';

import g1 from '../../assets/hints/g1.png';
import scaldera from '../../assets/hints/scaldera.png';
import moldarach from '../../assets/hints/moldarach.png';
import koloktos from '../../assets/hints/koloktos.png';
import tentalus from '../../assets/hints/tentalus.png';
import g2 from '../../assets/hints/g2.png';



const pathImages: {[key: string]: string} = {
    'Ghirahim 1': g1,
    'Scaldera': scaldera,
    'Moldarach': moldarach,
    'Koloktos': koloktos,
    'Tentalus': tentalus,
    'Ghirahim 2': g2,
};

type EntranceMarkerProps = {
    logic: Logic;
    markerX: number;
    markerY: number;
    title: string;
    onChange: MarkerClickCallback;
    onHintClick: HintClickCallback;
    onEntranceBind: EntranceBindCallback;
    onCheckAll: CheckAllClickCallback;
    mapWidth: number;
    colorScheme: ColorScheme;
    expandedGroup: string;
};

const EntranceMarker = (props: EntranceMarkerProps) => {
    
    const { onChange, onHintClick, onEntranceBind, onCheckAll, title, logic, markerX, markerY, mapWidth, colorScheme, expandedGroup} = props;
    const isDungeon = !(title.includes('Trial Gate'));
    let connections;
    if (isDungeon) {
        connections = logic.dungeonConnections;
    } else {
        connections = logic.trialConnections;
    }
    let region = '';
    if (connections !== undefined) {
        region = connections[title as keyof typeof connections];
    }
    const hasConnection = region !== '' && region !== undefined;
    let remainingChecks = 0;
    let accessibleChecks = 0;
    if (hasConnection) {
        remainingChecks = logic.getTotalCountForArea(region);
        accessibleChecks = logic.getInLogicCountForArea(region);
    }
    const rawReq = logic.getRequirement(`Can ${isDungeon ? 'Access' : 'Open'} ${title}`);
    const canReach = logic.areRequirementsMet(LogicHelper.booleanExpressionForRequirements(rawReq));
    console.log(rawReq);
    console.log(canReach);
    let markerColor: string = colorScheme.outLogic;
    if (hasConnection) {
        if (accessibleChecks !== 0) {
            markerColor = colorScheme.semiLogic;
        }
        if (accessibleChecks === remainingChecks) {
            markerColor = colorScheme.inLogic;
        }
        if (remainingChecks === 0) {
            markerColor = colorScheme.checked;
        }
    } else if (canReach) {
        markerColor = colorScheme.inLogic;
    } else {
        markerColor = colorScheme.checked;
    }
    const setHint = (value: string) => {
        if (hasConnection) {
            onHintClick(region, value);
        }
    }
    const bindEntrance = (exit: string) => {
        onEntranceBind(title, exit)
    }

    const showUnbound = useContextMenu({
        id: (isDungeon ? 'unbound-dungeon-context' :  'unbound-trial-context'),
    }).show;

    const showBound = useContextMenu({
        id: (isDungeon ? 'dungeon-context' :  'trial-context'),
    }).show;

    const setAllLocationsChecked = (value: boolean) => {
        onCheckAll(region, value);
    };

    const displayMenu = useCallback((e: MouseEvent) => {
        if (hasConnection) {
            showBound({ event: e, props: { setHint, bindEntrance, setAllLocationsChecked } });
        } else {
            showUnbound({ event: e, props: { setHint, bindEntrance } });
        }
    }, [showBound, showUnbound]);

    let hint = '';
    if (logic.regionHints !== undefined && hasConnection) {
        hint = logic.regionHints[region];
    }

    let image;
    let hintColor = colorScheme.checked;
    if (hint.includes('Path')) {
        image = <img src={pathImages[hint.slice(8)]} alt={hint} />;
        hintColor = colorScheme.inLogic;
    } else if (hint === 'Spirit of the Sword') {
        image = <img src={sotsImage} alt={hint} />;
        hintColor = colorScheme.inLogic;
    } else if (hint === 'Barren') {
        image = <img src={barrenImage} alt={hint} />;
    }

    const markerStyle: CSSProperties = {
        position: 'absolute',
        top: `${markerY}%`,
        left: `${markerX}%`,
        borderRadius: (isDungeon ? '0px' : '200px'),
        background: markerColor,
        width: mapWidth / 18,
        height: mapWidth / 18,
        border: '2px solid #000000',
        textAlign: 'center',
        fontSize: mapWidth / 27,
        lineHeight: '1.2',
    };

    let tooltip;

    if (hasConnection) {
        tooltip = (
            <center>
                <div> {title}</div>
                <div> {region} ({accessibleChecks}/{remainingChecks}) </div>
                <div style={{color:hintColor}}> {hint} </div>
            </center>
        )
    } else {
        tooltip = (
            <center>
                <div> {title} ({(canReach ? 'Accessible' : 'Inaccessible')})</div>
                <div> Click to Attach {isDungeon ? 'Dungeon' : 'Silent Realm'} </div>
            </center>
        )
    }

    const handleClick = (e: MouseEvent) => {
        if (e.type === 'contextmenu') {
            onChange(region);
            e.preventDefault();
        } else if (!hasConnection) {
            displayMenu(e);
        } else {
            onChange(region);
        }
    };

    return (
        <div>
            <Tippy content={tooltip} placement="bottom" followCursor plugins={[followCursor]} offset={[0, 20]} >
                <div
                    onClick={handleClick}
                    onKeyDown={keyDownWrapper(handleClick)}
                    role="button"
                    tabIndex={0}
                    onContextMenu={displayMenu}
                >
                    <span style={markerStyle} id="marker">
                        {(accessibleChecks > 0) && accessibleChecks}
                        {!hasConnection && '?'}
                    </span>
                </div>
            </Tippy>
            {expandedGroup === region && hasConnection && (
                <div
                    className="flex-container"
                    onClick={handleClick}
                    onKeyDown={keyDownWrapper(handleClick)}
                    tabIndex={0}
                    role="button"
                    onContextMenu={displayMenu}
                    style={{display: 'flex', flexDirection: 'row', width: mapWidth}}
                >
                    <div style={{flexGrow: 1, margin: '2%'}}>
                        <h3 style={{ color: colorScheme.text }}>
                            {region}
                        </h3>
                    </div>
                    <div style={{ color: colorScheme.text, margin: '1%' }}>
                        <span>{image}</span>
                    </div>
                    <div style={{margin: '2%'}}>
                        <h3>
                            <AreaCounters
                                totalChecksLeftInArea={logic.getTotalCountForArea(region)}
                                totalChecksAccessible={logic.getInLogicCountForArea(region)}
                                colorScheme={colorScheme}
                            />
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntranceMarker;