import { Col, Row } from 'react-bootstrap';
import LocationGroup from './LocationGroup';
import './locationTracker.css';
import areaBlacklist from '../data/areaBlacklist.json';
import LocationContextMenu from './LocationContextMenu';
import LocationGroupHeader from './LocationGroupHeader';
import LocationGroupContextMenu from './LocationGroupContextMenu';
import { useSelector } from 'react-redux';
import { areaSelector, areasSelector } from '../selectors/LogicOutput';

export default function LocationTracker({
    expandedGroup = '',
    handleGroupClick,
    containerHeight
}: {
    expandedGroup: string | undefined,
    handleGroupClick: (group: string) => void,
    containerHeight: number;
}) {
    const areas = useSelector(areasSelector);
    const expandedArea = useSelector(areaSelector(expandedGroup));
    return (
        <Col className="location-tracker">
            <LocationContextMenu />
            <LocationGroupContextMenu />
            <Row style={{ height: containerHeight / 2, overflowY: 'auto', overflowX: 'visible' }}>
                <ul style={{ padding: '2%' }}>
                    {
                        Object.keys(areas).filter((area) => !areaBlacklist.includes(area)).map((value) => (
                            <LocationGroupHeader key={value} title={value} onClick={() => handleGroupClick(value)} />
                        ))
                    }
                </ul>
            </Row>
            {
                expandedArea && (
                    <Row style={{ height: containerHeight / 2, overflowY: 'auto', overflowX: 'visible' }}>
                        <LocationGroup
                            groupName={expandedGroup}
                            locations={expandedArea.locations}
                            containerHeight={containerHeight / 2}
                        />
                    </Row>
                )
            }
        </Col>
    );
}
 