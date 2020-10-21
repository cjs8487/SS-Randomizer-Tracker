import React from 'react';
import noClawshots from '../../assets/Clawshots_Silhouette.png'
import clawshots from '../../assets/Clawshots_Icon.png'

export default class Clawshots extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Clawshots-item"}>
                    <img src={noClawshots} onClick={this.handleClick} alt={"No Whip"}/>
                </div>
            case 1:
                return <div id={"Clawshots-item"}>
                    <img src={clawshots} onClick={this.handleClick} alt={"Clawshots"}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("clawshots")
    }
}
