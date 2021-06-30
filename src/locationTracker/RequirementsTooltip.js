import React from 'react';
import PropTypes from 'prop-types';
import './RequirementsTooltip.css';
import _ from 'lodash';

class RequirementsTooltip extends React.Component {
    render() {
        return (
            <div>
                {
                    _.map(this.props.requirements, (value, index) => (
                        <li key={index}>
                            {
                                _.map(value, (requirement, requirementIndex) => {
                                    if (requirement.item === ' and ' || requirement.item === ' or ' || requirement.item === '(' || requirement.item === ')') {
                                        return (
                                            <span key={requirementIndex}>{requirement.name}</span>
                                        );
                                    }
                                    return (
                                        <span key={requirementIndex} className={this.props.meetsRequirement(requirement.item) ? 'met' : 'unmet'}>{requirement.name}</span>
                                    );
                                })
                            }
                        </li>
                    ))
                }
            </div>
        );
    }
}

RequirementsTooltip.propTypes = {
    requirements: PropTypes.arrayOf([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
    ]).isRequired,
    meetsRequirement: PropTypes.func.isRequired,
};
export default RequirementsTooltip;
