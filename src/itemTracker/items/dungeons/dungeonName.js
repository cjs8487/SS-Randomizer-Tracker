import React from 'react';
import './dungeons.css';

export default class DungeonName extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick() {
        this.props.onChange(`${this.props.dungeon.toLowerCase()}Name`);
        this.props.dungeonChange(this.props.dungeonName);
    }
}
