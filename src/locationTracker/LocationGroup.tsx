import _ from 'lodash';
import { Col, Row } from 'react-bootstrap';
import Location from './Location';
import { LocationState } from '../selectors/LogicOutput';

export default function LocationGroup({
    containerHeight,
    groupName,
    locations,
}: {
    /* the display name of this group */
    groupName: string,
    /* the list of locations this group contains */
    locations: LocationState[],
    containerHeight: number,
}) {
    const filteredLocations = _.filter(locations, (location) => !location.nonProgress);
    const locationChunks = _.chunk(filteredLocations, Math.ceil((_.size(filteredLocations))));
    const arrangedLocations = _.zip(...locationChunks);
    const locationRows = _.map(arrangedLocations, (locationRow, index) => (
        <Row key={index} style={{ paddingTop: '2%', paddingBottom: '2%', border: `1px solid var(--scheme-text)` }}>
            {
                _.map(locationRow, (location) => (
                    !_.isNil(location) && (
                        <Location
                            location={location}
                        />
                    )
                ))
            }
        </Row>
    ));
    return (
        <Col className={`location-group-${groupName}`} style={{ height: containerHeight }}>
            {locationRows}
        </Col>
    );
//     return (
//         <div className={`location-group-${groupName}`}>
//             {
//                 expanded && (
//                     <ul style={{ padding: '5%' }}>
//                         {
//                             locations.map((value, index) => {
//                                 const offset = Math.ceil(locations.length / 2);
//                                 if (index < offset) {
//                                     if (index + offset < locations.length) {
//                                         return (
//                                             <div className="row" key={value.name}>
//                                                 <div className="column">
//                                                     <Location
//                                                         location={value}
//                                                         group={groupName}
//                                                         handler={locationHandler}
//                                                         meetsRequirement={meetsRequirement}
//                                                         colorScheme={colorScheme}
//                                                     />
//                                                 </div>
//                                                 <div className="column" key={locations[index + offset].name}>
//                                                     <Location
//                                                         location={locations[index + offset]}
//                                                         group={groupName}
//                                                         handler={locationHandler}
//                                                         meetsRequirement={meetsRequirement}
//                                                         colorScheme={colorScheme}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         );
//                                     }
//                                     return (
//                                         <div className="row" key={locations[index + offset].name}>
//                                             <div className="column">
//                                                 <Location
//                                                     location={value}
//                                                     group={groupName}
//                                                     handler={locationHandler}
//                                                     meetsRequirement={meetsRequirement}
//                                                     colorScheme={colorScheme}
//                                                 />
//                                             </div>
//                                         </div>
//                                     );
//                                 }
//                                 return (<div key={value.name} />);
//                             })
//                         }
//                     </ul>
//                 )
//             }
//         </div>
//     );
}
