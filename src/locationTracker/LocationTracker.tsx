import { Col, Row } from 'react-bootstrap';
import LocationGroup from './LocationGroup';
import './locationTracker.css';
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
    containerHeight
}: {
    logic: Logic,
    expandedGroup: string | undefined,
    handleGroupClick: (group: string) => void,
    handleLocationClick: LocationClickCallback,
    handleCheckAllClick: (group: string, value: boolean) => void,
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
                            <LocationGroupHeader key={value} title={value} logic={logic} onClick={() => handleGroupClick(value)} onCheckAll={handleCheckAllClick} />
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
                            containerHeight={containerHeight / 2}
                        />
                    </Row>
                )
            }
        </Col>
    );
}
 