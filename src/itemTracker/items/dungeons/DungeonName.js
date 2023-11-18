import React from 'react';
import PropTypes from 'prop-types';
import './dungeons.css';
import ColorScheme from '../../../customization/ColorScheme';
import Logic from '../../../logic/Logic';
import keyDownWrapper from '../../../KeyDownWrapper';

class DungeonName extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.type === 'contextmenu') {
            this.props.groupClicked(this.props.dungeonName);
            e.preventDefault();
        } else {
            this.props.dungeonChange(this.props.dungeonName);
        }
    }

    render() {
        const currentStyle = {
            color: (this.props.logic.isDungeonRequired(this.props.dungeonName) ? this.props.colorScheme.required : this.props.colorScheme.unrequired),
        };
        const completedState = this.props.logic.isDungeonCompleted(this.props.dungeonName) ? 'complete' : 'incomplete';
        return (
            <div onClick={this.handleClick} onContextMenu={this.handleClick} onKeyDown={keyDownWrapper(this.handleClick)} role="button" tabIndex="0">
                <p className={completedState} style={currentStyle}>
                    {this.props.dungeon}
                </p>
            </div>
        );
    }
}

DungeonName.propTypes = {
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    dungeon: PropTypes.string.isRequired,
    dungeonName: PropTypes.string.isRequired,
    dungeonChange: PropTypes.func.isRequired,
    groupClicked: PropTypes.func.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
};


export default DungeonName;
