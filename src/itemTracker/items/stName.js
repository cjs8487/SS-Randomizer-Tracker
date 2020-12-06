import React from 'react';
import Name from '../../assets/dungeons/st_name.png'
import NameReq from '../../assets/dungeons/st_name.png'

export default class ST_Name extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"ST-name"}>
                    <img src={Name} onClick={this.handleClick} alt={"ST not required"}/>
                </div>
            case 1:
                return <div id={"ST-name"}>
                    <img src={NameReq} onClick={this.handleClick} alt={"ST is required"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){ 
        this.props.onChange("stName")
    }
}