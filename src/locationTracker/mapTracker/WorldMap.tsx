import React from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Logic from '../../logic/Logic';
import skyMap from '../../assets/maps/Sky.png';
import faronMap from '../../assets/maps/Faron.png';
import eldinMap from '../../assets/maps/Eldin.png';
import lanayruMap from '../../assets/maps/Lanayru.png';
import skyloftMap from '../../assets/maps/Skyloft.png';
import leaveSkyloft from '../../assets/maps/leaveSkyloft.png';
import leaveFaron from '../../assets/maps/leaveFaron.png';
import leaveEldin from '../../assets/maps/leaveEldin.png';
import leaveLanayru from '../../assets/maps/leaveLanayru.png';
import MapMarker from './MapMarker';
import ColorScheme from '../../customization/ColorScheme';
import LocationGroup from '../LocationGroup';
import Submap from './Submap';
import { MarkerClickCallback, LocationClickCallback } from '../../callbacks';
import mapData from '../../data/mapData.json';
import LocationContextMenu from '../LocationContextMenu';
import LocationGroupHeader from '../LocationGroupHeader';
import LocationGroupContextMenu from '../LocationGroupContextMenu';

type WorldMapProps = {
    logic: Logic,
    imgWidth: number,
    colorScheme: ColorScheme,
    handleGroupClick: MarkerClickCallback
    handleSubmapClick: MarkerClickCallback,
    handleLocationClick: LocationClickCallback,
    containerHeight: number,
    expandedGroup: string,
    activeSubmap: string,
};

const WorldMap = (props: WorldMapProps) => {
    const {imgWidth, activeSubmap, expandedGroup, logic, colorScheme} = props;

    const handleHeaderClick = () => {
        props.handleGroupClick(expandedGroup);
    };
    const {
        upper,
        central,
        village,
        batreaux,
        beedle,
        skyloftSubmapRaw,
        sg,
        woods,
        floria,
        ffw,
        faronSubmapRaw,
        volcano,
        turf,
        summit,
        bokoBase,
        eldinSubmapRaw,
        mine,
        desert,
        caves,
        sandSea,
        gorge,
        lanayruSubmapRaw,
        thunderhead,
        sky,
    } = mapData;

    const skyloftSubmap = {
        name: skyloftSubmapRaw.name,
        markerX: skyloftSubmapRaw.markerX,
        markerY: skyloftSubmapRaw.markerY,
        map: skyloftMap,
        markers: [
            upper,
            central,
            village,
            batreaux,
            beedle,
        ],
        exitParams: {
            image: leaveSkyloft,
            width: skyloftSubmapRaw.exitParams.width,
            left: skyloftSubmapRaw.exitParams.left,
            top: skyloftSubmapRaw.exitParams.top,
        },
    };

    const faronSubmap = {
        name: faronSubmapRaw.name,
        markerX: faronSubmapRaw.markerX,
        markerY: faronSubmapRaw.markerY,
        map: faronMap,
        markers: [
            sg,
            woods,
            floria,
            ffw,
        ],
        exitParams: {
            image: leaveFaron,
            width: faronSubmapRaw.exitParams.width,
            left: faronSubmapRaw.exitParams.left,
            top: faronSubmapRaw.exitParams.top,
        },
    };

    const eldinSubmap = {
        name: eldinSubmapRaw.name,
        markerX: eldinSubmapRaw.markerX,
        markerY: eldinSubmapRaw.markerY,
        map: eldinMap,
        markers: [
            volcano,
            turf,
            summit,
            bokoBase,
        ],
        exitParams: {
            image: leaveEldin,
            width: eldinSubmapRaw.exitParams.width,
            left: eldinSubmapRaw.exitParams.left,
            top: eldinSubmapRaw.exitParams.top,
        },
    };

    const lanayruSubmap = {
        name: lanayruSubmapRaw.name,
        markerX: lanayruSubmapRaw.markerX,
        markerY: lanayruSubmapRaw.markerY,
        map: lanayruMap,
        markers: [
            mine,
            desert,
            caves,
            sandSea,
            gorge,
        ],
        exitParams: {
            image: leaveLanayru,
            width: lanayruSubmapRaw.exitParams.width,
            left: lanayruSubmapRaw.exitParams.left,
            top: lanayruSubmapRaw.exitParams.top,
        },
    };

    const submaps = [
        faronSubmap,
        skyloftSubmap,
        eldinSubmap,
        lanayruSubmap,
    ];

    const markers = [
        thunderhead,
        sky,
    ];

    // original image dimensions
    const aspectRatio = 843/465;
    const imgHeight = imgWidth / aspectRatio;

    const worldMap = (
        <div style={{position:'absolute', width:imgWidth, height:imgWidth / aspectRatio}}>
            <div>
                {!activeSubmap &&
                    <img src={skyMap} alt="World Map" width={imgWidth}/>
                }
                {!activeSubmap && markers.map((marker) => (
                    <MapMarker
                        key={marker.region}
                        logic={logic}
                        markerX={marker.markerX}
                        markerY={marker.markerY}
                        title={marker.region}
                        onChange={props.handleGroupClick}
                        mapWidth={imgWidth}
                        colorScheme={colorScheme}
                    />
                ))}
                {submaps.map((submap) => (
                    <Submap
                        key={submap.name}
                        logic={logic}
                        markerX={submap.markerX}
                        markerY={submap.markerY}
                        title={submap.name}
                        onMarkerChange={props.handleGroupClick}
                        onSubmapChange={props.handleSubmapClick}
                        markers={submap.markers}
                        map={submap.map}
                        mapWidth={imgWidth}
                        colorScheme={colorScheme}
                        activeSubmap={activeSubmap}
                        exitParams={submap.exitParams}
                    />
                ))}
            </div>
            <LocationContextMenu />
            <LocationGroupContextMenu />
        </div>
    );
    const locationList = (
        <div style={{position:'relative', top:imgHeight, display:'flex'}}>
            {
                expandedGroup && (
                    <Col>
                        <Row style={{ paddingTop: '2%', paddingBottom: '2%', width:imgWidth * 1.1}}>
                            <LocationGroupHeader title={expandedGroup} logic={logic} colorScheme={colorScheme} onClick={handleHeaderClick} />
                        </Row>
                        <Row style={{ height: props.containerHeight * 0.592, overflowY: 'auto', overflowX: 'visible' }}>
                            <LocationGroup
                                groupName={expandedGroup}
                                locations={logic.locationsForArea(expandedGroup)}
                                expanded
                                handler={props.handleGroupClick}
                                locationHandler={props.handleLocationClick}
                                remainingChecks={logic.getTotalCountForArea(expandedGroup)}
                                inLogicChecks={logic.getInLogicCountForArea(expandedGroup)}
                                meetsRequirement={logic.isRequirementMet}
                                colorScheme={colorScheme}
                                containerHeight={props.containerHeight * 0.592}
                            />
                        </Row>
                    </Col>
                )
            }
        </div>
    );


    return (
        <div>
            {worldMap}
            {locationList}
        </div>
    );
}

export default WorldMap;
