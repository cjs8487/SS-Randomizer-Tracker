import React from 'react';
import './dungeons.css'

export default class DungeonName extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let currentStyle = this.props.current === 0 ? "unrequired" : "required"
        currentStyle += this.props.complete ? " complete" : " incomplete"
        return <p className={currentStyle} onClick={this.handleClick}>{this.props.dungeon} </p>
    }

    handleClick(){ 
        this.props.onChange(this.props.dungeon.toLowerCase() + "Name")
        this.props.dungeonChange(this.props.dungeonName)
    }
}