import _ from 'lodash';
import { Col, Row } from 'react-bootstrap';
import LocationGroup from './LocationGroup';
import './locationTracker.css';
import ColorScheme from '../customization/ColorScheme';
import Logic from '../logic/Logic';
import areaBlacklist from '../data/areaBlacklist.json';
import LocationContextMenu from './LocationContextMenu';
import LocationGroupHeader from './LocationGroupHeader';
import LocationGroupContextMenu from './LocationGroupContextMenu';
import { LocationClickCallback } from '../callbacks';

export default function LocationTracker({
    logic,
    expandedGroup = '',
    handleGroupClick,
    handleLocationClick,
    handleCheckAllClick,
    colorScheme,
    containerHeight
}: {
    logic: Logic,
    expandedGroup: string | undefined,
    handleGroupClick: (group: string) => void,
    handleLocationClick: LocationClickCallback,
    handleCheckAllClick: (group: string, value: boolean) => void,
    colorScheme: ColorScheme,
    containerHeight: number;
}) {
    return (
        <Col className="location-tracker">
            <LocationContextMenu />
            <LocationGroupContextMenu />
            <Row style={{ height: containerHeight / 2, overflowY: 'auto', overflowX: 'visible' }}>
                <ul style={{ padding: '2%' }}>
                    {
                        logic.areas().filter((area) => !areaBlacklist.includes(area)).map((value) => (
                            <LocationGroupHeader key={value} title={value} logic={logic} colorScheme={colorScheme} onClick={() => handleGroupClick(value)} onCheckAll={handleCheckAllClick} />
                        ))
                    }
                </ul>
            </Row>
            {
                expandedGroup && (
                    <Row style={{ height: containerHeight / 2, overflowY: 'auto', overflowX: 'visible' }}>
                        <LocationGroup
                            groupName={expandedGroup}
                            locations={logic.locationsForArea(expandedGroup)}
                            locationHandler={handleLocationClick}
                            meetsRequirement={logic.isRequirementMet}
                            colorScheme={colorScheme}
                            containerHeight={containerHeight / 2}
                        />
                    </Row>
                )
            }
        </Col>
    );
}
