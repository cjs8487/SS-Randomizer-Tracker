import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import Location from './Location';
import { useSelector } from 'react-redux';
import { areaSelector } from '../state/tracker/Selectors';


export default function CubeTracker({
    expandedGroup,
    className,
    containerHeight,
}: {
    expandedGroup: string | undefined;
    className: string;
    containerHeight: number
}) {
    const area = useSelector(areaSelector(expandedGroup));
    const locations = area?.extraLocations;
    if (!locations || locations.length === 0) {
        return (<div />);
    }
    const filteredLocations = _.filter(locations, (location) => !location.nonProgress);
    const locationChunks = _.chunk(filteredLocations, Math.ceil((_.size(filteredLocations) / 2)));
    const arrangedLocations = _.zip(...locationChunks);
    const locationRows = _.map(arrangedLocations, (locationRow, index) => (
        <Row key={index}>
            {
                _.map(locationRow, (location) => (
                    !_.isNil(location) && (
                        <Col>
                            <Location
                                location={location}
                            />
                        </Col>
                    )
                ))
            }
        </Row>
    ));
    return (
        <Col className={`cube-tracker ${className}`} style={{ height: containerHeight / 2 }}>
            {locationRows}
        </Col>
    );
    // return (
    //     <div className="cube-tracker">
    //         <ul>
    //             {
    //                 locations.map((value, index) => {
    //                     const offset = Math.ceil(locations.length / 2);
    //                     if (index < offset) {
    //                         if (index + offset < locations.length) {
    //                             return (
    //                                 <div className="row" key={value.name}>
    //                                     <div className="column">
    //                                         <Location
    //                                             location={value}
    //                                             handler={locationHandler}
    //                                             meetsRequirement={logic.isRequirementMet}
    //                                             colorScheme={colorScheme}
    //                                             hasGroup={false}
    //                                         />
    //                                     </div>
    //                                     <div className="column" key={value.name}>
    //                                         <Location
    //                                             location={locations[index + offset]}
    //                                             handler={locationHandler}
    //                                             meetsRequirement={logic.isRequirementMet}
    //                                             colorScheme={colorScheme}
    //                                             hasGroup={false}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             );
    //                         }
    //                         return (
    //                             <div className="row" key={value.name}>
    //                                 <div className="column">
    //                                     <Location
    //                                         location={value}
    //                                         handler={locationHandler}
    //                                         meetsRequirement={logic.isRequirementMet}
    //                                         colorScheme={colorScheme}
    //                                         hasGroup={false}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         );
    //                     }
    //                     return (<div key={value.name} />);
    //                 })
    //             }
    //         </ul>
    //     </div>
    // );
}
