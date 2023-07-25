import { CSSProperties, MouseEvent, useState, useCallback, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import 'react-contexify/dist/ReactContexify.css';
import { useContextMenu } from 'react-contexify';
import AreaCounters from '../AreaCounters';
import Logic from '../../logic/Logic';
import ColorScheme from '../../customization/ColorScheme';
import { MarkerClickCallback } from '../../callbacks';
import keyDownWrapper from '../../KeyDownWrapper';

import sotsImage from '../../assets/hints/sots.png';
import barrenImage from '../../assets/hints/barren.png';

import g1 from '../../assets/hints/g1.png';
import scaldera from '../../assets/hints/scaldera.png';
import moldarach from '../../assets/hints/moldarach.png';
import koloktos from '../../assets/hints/koloktos.png';
import tentalus from '../../assets/hints/tentalus.png';
import g2 from '../../assets/hints/g2.png';



const pathImages = [
    g1,
    scaldera,
    moldarach,
    koloktos,
    tentalus,
    g2,
];

const pathText = [
    'Ghirahim 1',
    'Scaldera',
    'Moldarach',
    'Koloktos',
    'Tentalus',
    'Ghirahim 2',
]

type MapMarkerProps = {
    logic: Logic;
    markerX: number;
    markerY: number;
    title: string;
    onChange: MarkerClickCallback;
    mapWidth: number;
    colorScheme: ColorScheme;
    expandedGroup: string;
};

const MapMarker = (props: MapMarkerProps) => {
    
    const { onChange, title, logic, markerX, markerY, mapWidth, colorScheme, expandedGroup} = props;
    const remainingChecks: number = logic.getTotalCountForArea(props.title);
    const accessibleChecks: number = logic.getInLogicCountForArea(props.title);
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
    const [sots, setSots] = useState(false);
    const [barren, setBarren] = useState(false);
    const [inEffect, setInEffect] = useState(false);
    const [pathIndex, setPath] = useState(6);

    const { show } = useContextMenu({
        id: 'group-context',
    });

    const displayMenu = useCallback((e: MouseEvent) => {
        show({ event: e, props: { setSots, setBarren, setPath } });
    }, [show]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setSots(false);
            setInEffect(true);
        }
    }, [pathIndex]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setPath(6);
            setInEffect(true);
        }
    }, [sots]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setSots(false);
            setPath(6);
            setInEffect(true);
        }
    }, [barren]);

    let image;
    if (pathIndex < 6) {
        image = <img src={pathImages[pathIndex]} alt="path" />;
    } else if (sots) {
        image = <img src={sotsImage} alt="sots" />;
    } else if (barren) {
        image = <img src={barrenImage} alt="barren" />;
    }

    let hintStatus;
    if (pathIndex < 6) {
        hintStatus = `Path to ${pathText[pathIndex]}`;
    } else if (sots) {
        hintStatus = 'Spirit of the Sword';
    } else if (barren) {
        hintStatus = 'Barren';
    }
    

    const markerStyle: CSSProperties = {
        position: 'absolute',
        top: `${markerY}%`,
        left: `${markerX}%`,
        borderRadius: '5px',
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
            <div style={{color:((pathIndex < 6 || sots) ? colorScheme.inLogic : colorScheme.checked)}}> {hintStatus} </div>
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
                    style={{display: 'flex', flexDirection: 'row'}}
                >
                    <div style={{flexGrow: 1, margin: '2%'}}>
                        <h3 style={{ color: props.colorScheme.text }}>
                            {props.title}
                        </h3>
                    </div>
                    <div style={{ color: props.colorScheme.text, margin: '1%' }}>
                        <span>{image}</span>
                    </div>
                    <div style={{margin: '2%'}}>
                        <h3>
                            <AreaCounters
                                totalChecksLeftInArea={props.logic.getTotalCountForArea(props.title)}
                                totalChecksAccessible={props.logic.getInLogicCountForArea(props.title)}
                                colorScheme={props.colorScheme}
                            />
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapMarker;