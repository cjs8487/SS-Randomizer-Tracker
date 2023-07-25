import { CSSProperties, MouseEvent } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import _ from 'lodash';
import Logic from '../../logic/Logic';
import ColorScheme from '../../customization/ColorScheme';
import MapMarker from './MapMarker';
import { MarkerClickCallback } from '../../callbacks';
import keyDownWrapper from '../../KeyDownWrapper';

export type MarkerParams = {
    region: string,
    markerX: number,
    markerY: number,
};

export type ExitParams = {
    image: string,
    width: number,
    left: number,
    top: number
}

type SubmapProps = {
    logic: Logic;
    markerX: number;
    markerY: number;
    title: string;
    colorScheme: ColorScheme;
    onSubmapChange: MarkerClickCallback;
    onMarkerChange: MarkerClickCallback;
    markers: Array<MarkerParams>;
    activeSubmap: string;
    map: string;
    mapWidth: number;
    exitParams: ExitParams;
    expandedGroup: string;
};

const Submap = (props: SubmapProps) => {
    let remainingChecks = 0
    let accessibleChecks = 0;
    const { onSubmapChange, title, logic, markerX, markerY, mapWidth, activeSubmap, colorScheme, markers, exitParams, expandedGroup} = props;
    _.forEach(markers, (marker) => {
        remainingChecks += logic.getTotalCountForArea(marker.region);
        accessibleChecks += logic.getInLogicCountForArea(marker.region);
    })
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
            <div> {title} </div>
            <div> {accessibleChecks} Accessible, {remainingChecks} Remaining </div>
        </center>
    )

    const handleClick = (e: MouseEvent) => {
        if (e.type === 'contextmenu') {
            onSubmapChange(title);
            e.preventDefault();
        } else {
            onSubmapChange(title);
        }
    };

    const markerElement = (
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

    const mapElement = (
        <div>
            <img src={props.map} alt={`${title} Map`} width={mapWidth} style={{position: 'relative'}}/>
            {props.markers.map((marker) => (
                <MapMarker
                    key={marker.region}
                    logic={props.logic}
                    markerX={marker.markerX}
                    markerY={marker.markerY}
                    title={marker.region}
                    onChange={props.onMarkerChange}
                    mapWidth={mapWidth}
                    colorScheme={props.colorScheme}
                    expandedGroup={expandedGroup}
                />
            ))}
            <div
                onKeyDown={keyDownWrapper(handleClick)}
                onClick={handleClick}
                role="button"
                tabIndex={0}
            >
                <img alt="leaveEldin" src={exitParams.image} width={exitParams.width * mapWidth / 100} style={{position: 'absolute', left: `${exitParams.left}%`, top: `${exitParams.top}%`}}/>
            </div>
        </div>
    );
    
    return (
        <div className="submap">
            <div style={{display:(title === activeSubmap ? '' : 'none')}}>
                {mapElement}
            </div>
            <div style={{display:(!activeSubmap ? '' : 'none')}}>
                {markerElement}
            </div>
        </div>
    );
};

export default Submap;
