import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Location from './Location';
import ItemLocation from '../logic/ItemLocation';
import ColorScheme from '../customization/ColorScheme';

// props:
// groupName - the display name of this group
// locations - the list of locations this group contains
// expanded - whether or not this group is expanded (boolean)
// handler - the event handler for this component, owned by a component higher in the heirarchy for managing state
// locationHandler - the event handler for location clicks
// checksPerLocation - dictionary containing every location and it's respective total number of remaining checks
class LocationGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.handler(this.props.groupName);
    }

    render() {
        const filteredLocations = _.filter(this.props.locations, (location) => !location.nonprogress);
        const locationChunks = _.chunk(filteredLocations, Math.ceil((_.size(filteredLocations))));
        const arrangedLocations = _.zip(...locationChunks);
        const locationRows = _.map(arrangedLocations, (locationRow, index) => (
            <Row key={index} style={{ paddingTop: '2%', paddingBottom: '2%', border: `1px solid ${this.props.colorScheme.text}` }}>
                {
                    _.map(locationRow, (location) => (
                        !_.isNil(location) && (
                            <Location
                                location={location}
                                group={this.props.groupName}
                                handler={this.props.locationHandler}
                                meetsRequirement={this.props.meetsRequirement}
                                colorScheme={this.props.colorScheme}
                            />
                        )
                    ))
                }
            </Row>
        ));
        return (
            <Col className={`location-group-${this.props.groupName}`} style={{ height: this.props.containerHeight }}>
                {locationRows}
            </Col>
        );
    //     return (
    //         <div className={`location-group-${this.props.groupName}`}>
    //             {
    //                 this.props.expanded && (
    //                     <ul style={{ padding: '5%' }}>
    //                         {
    //                             this.props.locations.map((value, index) => {
    //                                 const offset = Math.ceil(this.props.locations.length / 2);
    //                                 if (index < offset) {
    //                                     if (index + offset < this.props.locations.length) {
    //                                         return (
    //                                             <div className="row" key={value.name}>
    //                                                 <div className="column">
    //                                                     <Location
    //                                                         location={value}
    //                                                         group={this.props.groupName}
    //                                                         handler={this.props.locationHandler}
    //                                                         meetsRequirement={this.props.meetsRequirement}
    //                                                         colorScheme={this.props.colorScheme}
    //                                                     />
    //                                                 </div>
    //                                                 <div className="column" key={this.props.locations[index + offset].name}>
    //                                                     <Location
    //                                                         location={this.props.locations[index + offset]}
    //                                                         group={this.props.groupName}
    //                                                         handler={this.props.locationHandler}
    //                                                         meetsRequirement={this.props.meetsRequirement}
    //                                                         colorScheme={this.props.colorScheme}
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                         );
    //                                     }
    //                                     return (
    //                                         <div className="row" key={this.props.locations[index + offset].name}>
    //                                             <div className="column">
    //                                                 <Location
    //                                                     location={value}
    //                                                     group={this.props.groupName}
    //                                                     handler={this.props.locationHandler}
    //                                                     meetsRequirement={this.props.meetsRequirement}
    //                                                     colorScheme={this.props.colorScheme}
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
}

LocationGroup.propTypes = {
    // expanded: PropTypes.bool.isRequired,
    groupName: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    locationHandler: PropTypes.func.isRequired,
    locations: PropTypes.arrayOf(PropTypes.instanceOf(ItemLocation)).isRequired,
    meetsRequirement: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    containerHeight: PropTypes.number.isRequired,
};
export default LocationGroup;
