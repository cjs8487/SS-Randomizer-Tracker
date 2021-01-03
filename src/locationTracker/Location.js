import React from 'react';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import ReactTooltip from 'react-tooltip';
import RequirementsTooltip from './RequirementsTooltip';
import './Location.css';
import ColorScheme from '../customization/colorScheme';

// props:
// name - the dispaly name of this location
// group - the group this check belongs to
// checked - whether or not this location has been checked (booelan)
// handler - the handler in a aprent component for managing state
class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    onClick() {
        this.props.handler(this.props.group, this.props.location.localId);
    }

    render() {
        // console.log(this.props.items)
        const style = {
            textDecoration: this.props.location.checked ? 'line-through' : 'none',
            cursor: 'pointer',
            color: this.props.colorScheme[this.props.location.logicalState],
        };
        return (
            <div>
                <p
                    style={style}
                    onClick={() => this.onClick()}
                    data-tip={this.props.location.needs}
                    data-for={this.props.location.name}
                >
                    {this.props.location.name}
                </p>
                <ReactTooltip id={this.props.location.name}>
                    <RequirementsTooltip requirements={this.props.location.needs} meetsRequirement={this.props.meetsRequirement} />
                </ReactTooltip>
            </div>

        );
    }
}

Location.propTypes = {
    checked: PropTypes.bool.isRequired,
    group: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    location: PropTypes.shape({
        localId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        logicExpression: PropTypes.arrayOf(PropTypes.oneOf(PropTypes.string, PropTypes.array)),
        needs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(PropTypes.string, PropTypes.array))),
        inLogic: PropTypes.bool.isRequired,
        logicalState: PropTypes.number,
    }).isRequired,
    meetsRequirement: PropTypes.bool.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};

export default Location;
