import React from 'react'
import Location from './Location'

class CubeTracker extends React.Component {

    render() {
        // return (<div />)
        if (this.props.locations === undefined || this.props.locations.length === 0) {
            return (<div />)
        }
        return (
            <div className={"cube-tracker"}>
                <h3 onClick={() => this.onClick()} style={{cursor: "pointer"}}>
                    {this.props.groupName} 
                </h3>
                <ul>
                    {this.props.locations.map((value, index) => {
                        let offset = Math.ceil(this.props.locations.length / 2);
                        if (index < offset) {
                            if (index + offset < this.props.locations.length) {
                                return (
                                    <div className="row" key={index}>
                                        <div className="column">
                                            <Location
                                                location={value}
                                                group={this.props.groupName}
                                                handler={this.props.locationHandler}
                                                meetsRequirement={this.props.meetsRequirement}
                                            />
                                        </div>
                                        <div className="column" key={index+offset}>
                                            <Location
                                                location={this.props.locations[index + offset]}
                                                group={this.props.groupName}
                                                handler={this.props.locationHandler}
                                                meetsRequirement={this.props.meetsRequirement}
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
                                                meetsRequirement={this.props.meetsRequirement}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        } else {
                            return (<div key={index}/>)
                        }
                    })}
                </ul>
            </div>
        );
    }
}

export default CubeTracker;