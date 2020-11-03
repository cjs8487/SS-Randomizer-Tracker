import React from 'react';
import Name from '../../assets/dungeons/sk_name.png'
import NameReq from '../../assets/dungeons/sk_name.png'

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
                    <img src={Name} onClick={this.handleClick} alt={"SK not required"}/>
                </div>
            case 1:
                return <div id={"SK-name"}>
                    <img src={NameReq} onClick={this.handleClick} alt={"SK is required"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){ 
        this.props.onChange("skName")
    }
}