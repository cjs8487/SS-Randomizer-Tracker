import React from 'react';
import noEarrings from '../../assets/main quest/No_Earrings.png'
import earrings from '../../assets/main quest/Fireshield_Earrings.png'

export default class Earrings extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent

        switch (current) {
            case 0:
                return <div id={"Earrings-item"}>
                    <img src={noEarrings} onClick={this.handleClick} alt={"No Earrings"} width={parent.width/5.2}/>
                </div>
            case 1:
                return <div id={"Earrings-item"}>
                    <img src={earrings} onClick={this.handleClick} alt={"Earrings"} width={parent.width/5.2}/>
                </div>
            default:
                return null

        }
    }

    handleClick () {
        this.props.onChange("earrings")
        this.props.handleItemClick();
    }
}
