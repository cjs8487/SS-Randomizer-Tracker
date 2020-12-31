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
                                if (value === " and " || value === " or " || value === "(" || value === ")") {
                                    return (
                                        <span key={index}>{value}</span>
                                    )
                                } else {
                                    return (
                                        <span key={index} className={this.props.meetsRequirement(value) ? "met" : "unmet"}>{value}</span>
                                    )
                                }
                            })}
                        </li>
                    );
                })}
            </div>
        );
    }
}

export default RequirementsTooltip;