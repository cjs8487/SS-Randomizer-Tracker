import React from 'react';
import noTablet from '../../assets/tablets/No_Emerald_Tablet.png'
import tablet from '../../assets/tablets/emerald_tablet.png'

export default class EmeraldTablet extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent

        switch (current) {
            case 0:
                return <div id={"Tablet-item"}>
                    <img src={noTablet} onClick={this.handleClick} alt={"No Tablet"} width={parent.width/5.2}/>
                </div>
            case 1:
                return <div id={"Tablet-item"}>
                    <img src={tablet} onClick={this.handleClick} alt={"Tablet"} width={parent.width/5.2}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("emeraldTablet")
    }
}
