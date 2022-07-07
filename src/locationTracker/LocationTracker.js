import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import LocationGroup from './LocationGroup';
import './locationTracker.css';
import ColorScheme from '../customization/ColorScheme';
import Logic from '../logic/Logic';
import areaBlacklist from '../data/areaBlacklist.json';
import LocationContextMenu from './LocationContextMenu';
import LocationGroupHeader from './LocationGroupHeader';
import LocationGroupContextMenu from './LocationGroupContextMenu';

class LocationTracker extends React.Component {
    constructor(props) {
        super(props);
        _.forEach(this.props.logic.areas(), (area) => {
            this[_.camelCase(`open${area}`)] = this.openLocation.bind(this, area);
        });
    }

    openLocation(location) {
        this.props.handleGroupClick(location);
    }

    render() {
        return (
            <Col className="location-tracker">
                <LocationContextMenu />
                <LocationGroupContextMenu />
                <Row style={{ height: this.props.containerHeight / 2, overflowY: 'auto', overflowX: 'visible' }}>
                    <ul style={{ padding: '2%' }}>
                        {
                            this.props.logic.areas().filter((area) => !areaBlacklist.includes(area)).map((value) => (
                                <LocationGroupHeader title={value} logic={this.props.logic} colorScheme={this.props.colorScheme} onClick={this[_.camelCase(`open${value}`)]} />
                            ))
                        }
                    </ul>
                </Row>
                {
                    this.props.expandedGroup && (
                        <Row style={{ height: this.props.containerHeight / 2, overflowY: 'auto', overflowX: 'visible' }}>
                            <LocationGroup
                                groupName={this.props.expandedGroup}
                                locations={this.props.logic.locationsForArea(this.props.expandedGroup)}
                                expanded
                                handler={this.props.handleGroupClick}
                                locationHandler={this.props.handleLocationClick}
                                remainingChecks={this.props.logic.getTotalCountForArea(this.props.expandedGroup)}
                                inLogicChecks={this.props.logic.getInLogicCountForArea(this.props.expandedGroup)}
                                meetsRequirement={this.props.logic.isRequirementMet}
                                colorScheme={this.props.colorScheme}
                                containerHeight={this.props.containerHeight / 2}
                            />
                        </Row>
                    )
                }
            </Col>
        );
    }
}
LocationTracker.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    expandedGroup: PropTypes.string,
    handleGroupClick: PropTypes.func.isRequired,
    handleLocationClick: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    containerHeight: PropTypes.number.isRequired,
};
LocationTracker.defaultProps = {
    expandedGroup: '',
};
export default LocationTracker;
