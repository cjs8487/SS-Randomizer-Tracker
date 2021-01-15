import React from 'react';
import PropTypes from 'prop-types';
import './dungeons.css';
import ColorScheme from '../../../customization/colorScheme';

class DungeonName extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let currentStyle = {
            color: (this.props.logic.isDungeonRequired(this.props.dungeonName) ? this.props.colorScheme.required : this.props.colorScheme.unrequired)
        }
        let completedState = this.props.logic.isDungeonCompleted(this.props.dungeonName) ? "complete" : "incomplete"
        return <p className={completedState} style={currentStyle} onClick={this.handleClick}>{this.props.dungeon} </p>
    }

    handleClick(){
        this.props.dungeonChange(this.props.dungeonName)
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
