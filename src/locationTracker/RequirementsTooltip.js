import React from 'react'

class RequirementsTooltip extends React.Component {

    render() {
        return (
            <div>
                <p>Requirements</p>
                <ul>
                    {this.props.requirements.map((value, index) => {
                        return (
                            <li key={index}>{value}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RequirementsTooltip;