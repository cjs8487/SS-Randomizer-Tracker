import React from 'react';
import Name from '../../assets/dungeons/et_name.png'
import NameReq from '../../assets/dungeons/et_name.png'

export default class ET_Name extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"ET-name"}>
                    <img src={Name} onClick={this.handleClick} alt={"ET not required"}/>
                </div>
            case 1:
                return <div id={"ET-name"}>
                    <img src={NameReq} onClick={this.handleClick} alt={"ET is required"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){ 
        this.props.onChange("etName")
    }
}