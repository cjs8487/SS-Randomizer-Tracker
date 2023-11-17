import { CSSProperties, MouseEvent, useCallback } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import 'react-contexify/dist/ReactContexify.css';
import { useContextMenu } from 'react-contexify';
import AreaCounters from '../AreaCounters';
import Logic from '../../logic/Logic';
import ColorScheme from '../../customization/ColorScheme';
import { CheckAllClickCallback, MarkerClickCallback, HintClickCallback } from '../../callbacks';
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

type MapMarkerProps = {
    logic: Logic;
    markerX: number;
    markerY: number;
    title: string;
    onChange: MarkerClickCallback;
    onHintClick: HintClickCallback;
    onCheckAll: CheckAllClickCallback;
    mapWidth: number;
    colorScheme: ColorScheme;
    expandedGroup: string;
};

const MapMarker = (props: MapMarkerProps) => {
    
    const { onChange, onHintClick, onCheckAll, title, logic, markerX, markerY, mapWidth, colorScheme, expandedGroup} = props;
    const remainingChecks: number = logic.getTotalCountForArea(title);
    const accessibleChecks: number = logic.getInLogicCountForArea(title);
    let markerColor: string = colorScheme.outLogic;
    if (accessibleChecks !== 0) {
        markerColor = colorScheme.semiLogic;
    }
    if (accessibleChecks === remainingChecks) {
        markerColor = colorScheme.inLogic;
    }
    if (remainingChecks === 0) {
        markerColor = colorScheme.checked;
    }

    const setHint = (value: string) => {
        onHintClick(title, value);
    };

    const setAllLocationsChecked = (value: boolean) => {
        onCheckAll(title, value);
    };

    const { show } = useContextMenu({
        id: 'group-context',
    });

    const displayMenu = useCallback((e: MouseEvent) => {
        show({ event: e, props: { setAllLocationsChecked, setHint } });
    }, [show]);

    let hint = '';
    if (logic.regionHints !== undefined) {
        hint = logic.regionHints[title];
    };

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
    };

    const markerStyle: CSSProperties = {
        position: 'absolute',
        top: `${markerY}%`,
        left: `${markerX}%`,
        borderRadius: (title.includes('Silent Realm') ? '200px' : '8px'),
        background: markerColor,
        width: mapWidth / 18,
        height: mapWidth / 18,
        border: '2px solid #000000',
        textAlign: 'center',
        fontSize: mapWidth / 27,
        lineHeight: '1.2',
    };

    const tooltip = (
        <center>
            <div> {title} ({accessibleChecks}/{remainingChecks}) </div>
            <div style={{color:hintColor}}> {hint} </div>
        </center>
    )

    const handleClick = (e: MouseEvent) => {
        if (e.type === 'contextmenu') {
            onChange(title);
            e.preventDefault();
        } else {
            onChange(title);
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
                    </span>
                </div>
            </Tippy>
            {expandedGroup === title && (
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
                            {title}
                        </h3>
                    </div>
                    <div style={{ color: colorScheme.text, margin: '1%' }}>
                        <span>{image}</span>
                    </div>
                    <div style={{margin: '2%'}}>
                        <h3>
                            <AreaCounters
                                totalChecksLeftInArea={logic.getTotalCountForArea(title)}
                                totalChecksAccessible={logic.getInLogicCountForArea(title)}
                                colorScheme={colorScheme}
                            />
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapMarker;