import React from 'react';
import PropTypes from 'prop-types';
import './dungeons.css';
import ColorScheme from '../../../customization/colorScheme';

class DungeonName extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange(`${this.props.dungeon.toLowerCase()}Name`);
        this.props.dungeonChange(this.props.dungeonName);
    }

    render() {
        const currentStyle = {
            color: (this.props.current === 0 ? this.props.colorScheme.unrequired : this.props.colorScheme.required),
        };
        const completedState = this.props.complete ? ' complete' : ' incomplete';
        return (
            <p className={completedState} style={currentStyle} onClick={this.handleClick}>
                {this.props.dungeon}
                {' '}
            </p>
        );
    }
}

DungeonName.propTypes = {
    onChange: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    complete: PropTypes.bool.isRequired,
    dungeon: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    dungeonName: PropTypes.string.isRequired,
    dungeonChange: PropTypes.string.isRequired,
};

export default DungeonName;
