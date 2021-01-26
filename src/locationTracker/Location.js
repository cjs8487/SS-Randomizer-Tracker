import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import RequirementsTooltip from './RequirementsTooltip';
import './Location.css';
import ColorScheme from '../customization/ColorScheme';

// props:
// name - the dispaly name of this location
// group - the group this check belongs to
// checked - whether or not this location has been checked (booelan)
// handler - the handler in a aprent component for managing state
class Location extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.handler(this.props.group, this.props.location);
    }

    render() {
        // console.log(this.props.items)
        const style = {
            textDecoration: this.props.location.checked ? 'line-through' : 'none',
            cursor: 'pointer',
            color: this.props.colorScheme[this.props.location.logicalState],
        };
        return (
            <div onClick={this.onClick} onKeyDown={this.onClick} role="button" tabIndex="0">
                <p
                    style={style}
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
        needs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(PropTypes.string, PropTypes.array))).isRequired,
        inLogic: PropTypes.bool.isRequired,
        logicalState: PropTypes.string.isRequired,
    }).isRequired,
    meetsRequirement: PropTypes.bool.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};

export default Location;
