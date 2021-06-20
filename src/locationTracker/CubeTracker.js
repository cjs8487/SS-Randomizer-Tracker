import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Location from './Location';
import ItemLocation from '../logic/ItemLocation';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

class CubeTracker extends React.Component {
    render() {
        if (this.props.locations === undefined || this.props.locations.length === 0) {
            return (<div />);
        }
        const filteredLocations = _.filter(this.props.locations, (location) => !location.nonprogress);
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
                                    hasGroup={false}
                                    handler={this.props.locationHandler}
                                    meetsRequirement={this.props.logic.isRequirementMet}
                                    colorScheme={this.props.colorScheme}
                                />
                            </Col>
                        )
                    ))
                }
            </Row>
        ));
        return (
            <Col className="cube-tracker" style={{ height: this.props.containerHeight / 2 }}>
                {locationRows}
            </Col>
        );
        // return (
        //     <div className="cube-tracker">
        //         <ul>
        //             {
        //                 this.props.locations.map((value, index) => {
        //                     const offset = Math.ceil(this.props.locations.length / 2);
        //                     if (index < offset) {
        //                         if (index + offset < this.props.locations.length) {
        //                             return (
        //                                 <div className="row" key={value.name}>
        //                                     <div className="column">
        //                                         <Location
        //                                             location={value}
        //                                             handler={this.props.locationHandler}
        //                                             meetsRequirement={this.props.logic.isRequirementMet}
        //                                             colorScheme={this.props.colorScheme}
        //                                             hasGroup={false}
        //                                         />
        //                                     </div>
        //                                     <div className="column" key={value.name}>
        //                                         <Location
        //                                             location={this.props.locations[index + offset]}
        //                                             handler={this.props.locationHandler}
        //                                             meetsRequirement={this.props.logic.isRequirementMet}
        //                                             colorScheme={this.props.colorScheme}
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
        //                                         handler={this.props.locationHandler}
        //                                         meetsRequirement={this.props.logic.isRequirementMet}
        //                                         colorScheme={this.props.colorScheme}
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
}
CubeTracker.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.instanceOf(ItemLocation)).isRequired,
    locationHandler: PropTypes.func.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    containerHeight: PropTypes.number.isRequired,
};
export default CubeTracker;
