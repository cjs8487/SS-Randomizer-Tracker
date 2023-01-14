import React from 'react';
import PropTypes from 'prop-types';
import keyDownWrapper from '../../../KeyDownWrapper';

class DungeonIcon extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.groupClicked(this.props.area);
    }

    render() {
        return (
            <div onClick={this.onClick} role="button" tabIndex="0" onKeyDown={keyDownWrapper(this.onClick)}>
                <img src={this.props.image} alt={this.props.iconLabel} width={this.props.width} />
            </div>
        );
    }
}

DungeonIcon.propTypes = {
    image: PropTypes.string.isRequired,
    iconLabel: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    groupClicked: PropTypes.func.isRequired,
    area: PropTypes.string.isRequired,
};
export default DungeonIcon;
