import React from 'react'
import './RequirementsTooltip.css'

class RequirementsTooltip extends React.Component {

    render() {
        // console.log(this.props.items)
        return (
            <div>
                {this.props.requirements.map((value, index) => {
                    if (value.includes(" or ")) {
                        let reqs = value.split(" or ");
                        return (
                            <li key={index}>
                                {reqs.map((value, index) => {
                                    if (index < reqs.length-1) {
                                        return (
                                            <span key={index}><span className={this.props.meetsRequirement(value) ? "met" : "unmet"}>{value}</span> or <span></span></span>
                                        )
                                    } else {
                                        return (
                                            <span key={index} className={this.props.meetsRequirement(value) ? "met" : "unmet"}>{value}</span>
                                        )
                                    }
                                })}
                            </li>
                        );
                    } else {
                        return (
                            <li key={index}><span className={this.props.meetsRequirement(value) ? "met" : "unmet"}>{value}</span></li>
                        );
                    }
                })}
            </div>
        );
    }
}

export default RequirementsTooltip;