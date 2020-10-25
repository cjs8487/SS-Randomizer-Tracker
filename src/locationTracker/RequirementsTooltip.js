import React from 'react'

class RequirementsTooltip extends React.Component {

    render() {
        return (
            <div>
                {this.props.requirements.map((value, index) => {
                    return (
                        <li key={index}>{value}</li>
                    );
                })}
            </div>
        );
    }
}

export default RequirementsTooltip;