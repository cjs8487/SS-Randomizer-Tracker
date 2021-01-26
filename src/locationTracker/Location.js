import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import RequirementsTooltip from './RequirementsTooltip';
import './Location.css';
import ColorScheme from '../customization/ColorScheme';
import ItemLocation from '../logic/ItemLocation';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.hasGroup) {
            this.props.handler(this.props.group, this.props.location);
        } else {
            this.props.handler(this.props.location);
        }
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
    group: PropTypes.string,
    handler: PropTypes.func.isRequired,
    location: PropTypes.shape(PropTypes.instanceOf(ItemLocation)).isRequired,
    meetsRequirement: PropTypes.bool.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    hasGroup: PropTypes.bool,
};
Location.defaultProps = {
    group: '',
    hasGroup: true,
};

export default Location;
