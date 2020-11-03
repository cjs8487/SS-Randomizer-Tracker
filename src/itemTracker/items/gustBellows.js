import React from 'react';
import noGustBellows from '../../assets/Gust_Bellows_Silhouette.png'
import gustBellows from '../../assets/Gust_Bellows_Icon.png'

export default class GustBellows extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent

        switch (current) {
            case 0:
                return <div id={"GustBellows-item"}>
                    <img src={noGustBellows} onClick={this.handleClick} alt={"No GustBellows"} width={parent.width/5.2}/>
                </div>
            case 1:
                return <div id={"GustBellows-item"}>
                    <img src={gustBellows} onClick={this.handleClick} alt={"GustBellows"} width={parent.width/5.2}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("gustBellows")
    }
}
