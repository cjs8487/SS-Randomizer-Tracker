import React, { CSSProperties, MouseEvent } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import Logic from '../../logic/Logic';
import ColorScheme from '../../customization/ColorScheme';
import { MarkerClickCallback } from '../../callbacks';
import keyDownWrapper from '../../KeyDownWrapper';

type MapMarkerProps = {
    logic: Logic;
    markerX: number;
    markerY: number;
    title: string;
    onChange: MarkerClickCallback;
    mapWidth: number;
    colorScheme: ColorScheme;
};

const MapMarker = (props: MapMarkerProps) => {
    
    const { onChange, title, logic, markerX, markerY, mapWidth, colorScheme} = props;
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
        <Tippy content={tooltip} placement="bottom" followCursor plugins={[followCursor]} offset={[0, 20]} >
            <div
                onClick={handleClick}
                onKeyDown={keyDownWrapper(handleClick)}
                role="button"
                tabIndex={0}
            >
                <span style={markerStyle} id="marker">
                    {(accessibleChecks > 0) && accessibleChecks}
                </span>
            </div>
        </Tippy>
    );
};

export default MapMarker;