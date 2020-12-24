import React from 'react';
import './dungeons.css'

export default class DungeonName extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        let currentStyle;
        switch (current) {
            case 0:
                currentStyle =  "unrequired incomplete"
                break;
            case 1:
                currentStyle =  "required incomplete"
                break;
            case 2:
                currentStyle =  "completed"
                break;
            default:
                currentStyle = ""
        }
        
        return <p className={currentStyle} onClick={this.handleClick}>{this.props.dungeon} </p>
    }

    handleClick(){ 
        this.props.onChange(this.props.dungeon.toLowerCase() + "Name")
        this.props.dungeonChange(this.props.dungeonName)
    }
}