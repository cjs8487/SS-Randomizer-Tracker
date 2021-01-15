import React from 'react'
import './RequirementsTooltip.css'
import _ from 'lodash'

class RequirementsTooltip extends React.Component {
    render() {
        // console.log(this.props.items)
        return (
            <div>
                {_.map(this.props.requirements, (value, index) => {
                    // let reqs = value.split(/( and )|( or )|([(])|([)])/);
                    return (
                        <li key={index}>
                            {_.map(value, (value, index) => {
                                if (value.item === " and " || value.item === " or " || value.item === "(" || value.item === ")") {
                                    return (
                                        <span key={index}>{value.name}</span>
                                    )
                                } else {
                                    return (
                                        <span key={index} className={this.props.meetsRequirement(value.item) ? "met" : "unmet"}>{value.name}</span>
                                    )
                                }
                                return (
                                    <span key={index} className={this.props.meetsRequirement(value) ? 'met' : 'unmet'}>{value}</span>
                                );
                            })}
                        </li>
                    );
                })}
            </div>
        );
    }
}

export default RequirementsTooltip;
