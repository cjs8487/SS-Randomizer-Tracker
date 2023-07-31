import { Row, Col } from 'react-bootstrap';
import Logic from '../../logic/Logic';
import skyMap from '../../assets/maps/Sky.png';
import faronMap from '../../assets/maps/Faron.png';
import eldinMap from '../../assets/maps/Eldin.png';
import lanayruMap from '../../assets/maps/Lanayru.png';
import skyloftMap from '../../assets/maps/Skyloft.png';
import MapMarker from './MapMarker';
import ColorScheme from '../../customization/ColorScheme';
import LocationGroup from '../LocationGroup';
import Submap from './Submap';
import { MarkerClickCallback, LocationClickCallback, HintClickCallback, DungeonBindCallback } from '../../callbacks';
import mapData from '../../data/mapData.json';
import LocationContextMenu from '../LocationContextMenu';
import LocationGroupContextMenu from '../LocationGroupContextMenu';

type WorldMapProps = {
    logic: Logic,
    imgWidth: number,
    colorScheme: ColorScheme,
    handleGroupClick: MarkerClickCallback
    handleSubmapClick: MarkerClickCallback,
    handleLocationClick: LocationClickCallback,
    handleHintClick: HintClickCallback,
    handleDungeonBind: DungeonBindCallback,
    containerHeight: number,
    expandedGroup: string,
    activeSubmap: string,
};

const images = new Map<string, any>([
    ['skyloftMap', skyloftMap],
    ['faronMap', faronMap],
    ['eldinMap', eldinMap],
    ['lanayruMap', lanayruMap],
]);

const WorldMap = (props: WorldMapProps) => {
    const {containerHeight, activeSubmap, expandedGroup, logic, colorScheme, handleGroupClick, handleSubmapClick, handleHintClick, handleDungeonBind} = props;
    let { imgWidth } = props;
    // original image dimensions
    const aspectRatio = 843/465;
    let imgHeight = imgWidth / aspectRatio;
    if (imgHeight > containerHeight * 0.55) {
        imgHeight = containerHeight * 0.55;
        imgWidth = imgHeight * aspectRatio;
    }
    const {
        skyloftSubmap,
        faronSubmap,
        eldinSubmap,
        lanayruSubmap,
        thunderhead,
        sky,
    } = mapData;

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

    const worldMap = (
        <div style={{position:'absolute', width:imgWidth, height:imgWidth / aspectRatio}}>
            <div>
                {!activeSubmap &&
                    <img src={skyMap} alt="World Map" width={imgWidth}/>
                }
                {markers.map((marker) => (
                    <div style={{display:(!activeSubmap ? '' : 'none')}}>
                        <MapMarker
                            key={marker.region}
                            logic={logic}
                            markerX={marker.markerX}
                            markerY={marker.markerY}
                            title={marker.region}
                            onChange={handleGroupClick}
                            onHintClick={handleHintClick}
                            mapWidth={imgWidth}
                            colorScheme={colorScheme}
                            expandedGroup={expandedGroup}
                        />
                    </div>
                ))}
                {submaps.map((submap) => (
                    <Submap
                        key={submap.name}
                        logic={logic}
                        markerX={submap.markerX}
                        markerY={submap.markerY}
                        title={submap.name}
                        onMarkerChange={handleGroupClick}
                        onSubmapChange={handleSubmapClick}
                        onHintClick={handleHintClick}
                        onDungeonBind={handleDungeonBind}
                        markers={submap.markers}
                        dungeons={submap.dungeons}
                        map={images.get(submap.map)}
                        mapWidth={imgWidth}
                        colorScheme={colorScheme}
                        activeSubmap={activeSubmap}
                        exitParams={submap.exitParams}
                        expandedGroup={expandedGroup}
                    />
                ))}
            </div>
            <LocationContextMenu />
            <LocationGroupContextMenu logic={logic}/>
        </div>
    );
    const locationList = (
        <div style={{position:'relative', top: imgHeight * 1.1 + 30, display:'flex'}}>
            {
                expandedGroup && (
                    <Col>
                        <Row style={{ width: imgWidth, height: containerHeight * 0.35, overflowY: 'scroll', overflowX: 'visible' }}>
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
                                containerHeight={containerHeight * 0.35}
                                mapMode
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
