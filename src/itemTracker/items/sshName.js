import React from 'react';

export default class SSH_Name extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"SSH-name"}>
                    <p style={{fontFamily: "HyliaSerif", fontSize:"xx-large", cursor: "pointer"}} onClick={this.handleClick}>SSH</p>
                </div>
            case 1:
                return <div id={"SSH-name"}>
                    <p style={{fontFamily: "HyliaSerif", fontSize:"xx-large", color: "green", cursor: "pointer"}} onClick={this.handleClick}>SSH</p>
                </div>
            default:
                return null
        }
    }

    handleClick(){ 
        this.props.onChange("sshName")
        this.props.dungeonChange("Sandship")
    }
}