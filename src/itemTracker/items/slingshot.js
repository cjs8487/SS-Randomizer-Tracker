import React from 'react';
import slingshot from '../../assets/Slingshot_Icon.png'
import noSlingshot from '../../assets/Slingshot_Silhouette.png'

export default class Slingshot extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch (current) {
            case 0:
                return <div id={"Slingshot-item"}>
                    <img src={noSlingshot} onClick={this.handleClick} alt={"No Slingshot"} width={parent.width/6.5}/>
                </div>
            case 1:
                return <div id={"Slingshot-item"}>
                    <img src={slingshot} onClick={this.handleClick} alt={"Slingshot"} width={parent.width/6.5}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("slingshot")
        this.props.handleItemClick();
    }
}
