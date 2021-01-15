import React from 'react';
import Location from './Location';

class CubeTracker extends React.Component {
    render() {
        if (this.props.locations === undefined || this.props.locations.length === 0) {
            return (<div />);
        }
        return (
            <div className="cube-tracker">
                <ul>
                    {this.props.locations.map((value, index) => {
                        const offset = Math.ceil(this.props.locations.length / 2);
                        if (index < offset) {
                            if (index + offset < this.props.locations.length) {
                                return (
                                    <div className="row" key={index}>
                                        <div className="column">
                                            <Location
                                                location={value}
                                                group={this.props.groupName}
                                                handler={this.props.locationHandler}
                                                meetsRequirement={this.props.logic.isRequirementMet}
                                                colorScheme={this.props.colorScheme}
                                            />
                                        </div>
                                        <div className="column" key={index + offset}>
                                            <Location
                                                location={this.props.locations[index + offset]}
                                                group={this.props.groupName}
                                                handler={this.props.locationHandler}
                                                meetsRequirement={this.props.logic.isRequirementMet}
                                                colorScheme={this.props.colorScheme}
                                             />
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="row" key={index}>
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
                            return (
                                <div className="row" key={index}>
                                    <div className="column">
                                        <Location
                                            location={value}
                                            group={this.props.groupName}
                                            handler={this.props.locationHandler}
                                            meetsRequirement={this.props.meetsRequirement}
                                            colorScheme={this.props.colorScheme}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        return (<div key={index} />);
                    })}
                </ul>
            </div>
        );
    }
}
export default CubeTracker;
