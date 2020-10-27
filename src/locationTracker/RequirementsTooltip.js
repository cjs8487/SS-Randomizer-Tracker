import React from 'react'
import './RequirementsTooltip.css'

class RequirementsTooltip extends React.Component {

    render() {
        // console.log(this.props.items)
        return (
            <div>
                {this.props.requirements.map((value, index) => {

                    let reqs = value.split(/( and )|( or )|([(])|([)])/);
                    return (
                        <li key={index}>
                            {reqs.map((value, index) => {
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