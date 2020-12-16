import React from 'react';

export default class SK_Name extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"SK-name"}>
                    <p style={{fontFamily: "HyliaSerif", fontSize:"xx-large", cursor: "pointer"}} onClick={this.handleClick}>SK</p>
                </div>
            case 1:
                return <div id={"SK-name"}>
                    <p style={{fontFamily: "HyliaSerif", fontSize:"xx-large", color: "green", cursor: "pointer"}} onClick={this.handleClick}>SK</p>
                </div>
            default:
                return null
        }
    }

    handleClick(){ 
        this.props.onChange("skName")
    }
}