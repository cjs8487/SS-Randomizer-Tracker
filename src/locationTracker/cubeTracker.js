import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';
import ItemLocation from '../logic/ItemLocation';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/colorScheme';

class CubeTracker extends React.Component {
    render() {
        if (this.props.locations === undefined || this.props.locations.length === 0) {
            return (<div />);
        }
        return (
            <div className="cube-tracker">
                <ul>
                    {
                        this.props.locations.map((value, index) => {
                            const offset = Math.ceil(this.props.locations.length / 2);
                            if (index < offset) {
                                if (index + offset < this.props.locations.length) {
                                    return (
                                        <div className="row" key={value.name}>
                                            <div className="column">
                                                <Location
                                                    location={value}
                                                    group={this.props.groupName}
                                                    handler={this.props.locationHandler}
                                                    meetsRequirement={this.props.logic.isRequirementMet}
                                                    colorScheme={this.props.colorScheme}
                                                />
                                            </div>
                                            <div className="column" key={value.name}>
                                                <Location
                                                    location={this.props.locations[index + offset]}
                                                    group={this.props.groupName}
                                                    handler={this.props.locationHandler}
                                                    meetsRequirement={this.props.logic.isRequirementMet}
                                                    colorScheme={this.props.colorScheme}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="row" key={value.name}>
                                        <div className="column">
                                            <Location
                                                location={value}
                                                group={this.props.groupName}
                                                handler={this.props.locationHandler}
                                                meetsRequirement={this.props.logic.isRequirementMet}
                                                colorScheme={this.props.colorScheme}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                            return (<div key={value.name} />);
                        })
                    }
                </ul>
            </div>
        );
    }
}
CubeTracker.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.instanceOf(ItemLocation)).isRequired,
    groupName: PropTypes.string.isRequired,
    locationHandler: PropTypes.func.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};
export default CubeTracker;
