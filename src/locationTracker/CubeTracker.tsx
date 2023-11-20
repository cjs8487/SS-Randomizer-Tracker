import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import Location from './Location';
import ItemLocation from '../logic/ItemLocation';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';


export default function CubeTracker({
    colorScheme,
    containerHeight,
    locationHandler,
    locations,
    logic
}: {
    locations: ItemLocation[],
    locationHandler: (location: ItemLocation) => void,
    logic: Logic,
    colorScheme: ColorScheme,
    containerHeight: number
}) {
    if (locations === undefined || locations.length === 0) {
        return (<div />);
    }
    const filteredLocations = _.filter(locations, (location) => !location.nonprogress);
    const locationChunks = _.chunk(filteredLocations, Math.ceil((_.size(filteredLocations) / 2)));
    const arrangedLocations = _.zip(...locationChunks);
    const locationRows = _.map(arrangedLocations, (locationRow, index) => (
        <Row key={index}>
            {
                _.map(locationRow, (location) => (
                    !_.isNil(location) && (
                        <Col>
                            <Location
                                group=""
                                location={location}
                                handler={(_group, loc) => locationHandler(loc)}
                                meetsRequirement={logic.isRequirementMet}
                                colorScheme={colorScheme}
                            />
                        </Col>
                    )
                ))
            }
        </Row>
    ));
    return (
        <Col className="cube-tracker" style={{ height: containerHeight / 2 }}>
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
