import React from 'react';
import noSlingshot from '../../assets/Slingshot_Icon.png'
import slingshot from '../../assets/Slingshot_Silhouette.png'

export default class Slingshot extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        switch (current) {
            case 0:
                return <div id={"Slingshot-item"}>
                    <img src={noSlingshot} onClick={this.handleClick} alt={"No Slingshot"}/>
                </div>
            case 1:
                return <div id={"Slingshot-item"}>
                    <img src={slingshot} onClick={this.handleClick} alt={"Slingshot"}/>
                </div>
            default:
                return

        }
    }

    handleClick () {
        this.props.onChange("slingshot")
    }
}
