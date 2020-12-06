import React from 'react';
import Name from '../../assets/dungeons/lmf_name.png'
import NameReq from '../../assets/dungeons/lmf_name.png'

export default class LMF_Name extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const current = this.props.current
        let parent = this.props.parent
        switch(current) {
            case 0:
                return <div id={"LMF-name"}>
                    <img src={Name} onClick={this.handleClick} alt={"LMF not required"}/>
                </div>
            case 1:
                return <div id={"LMF-name"}>
                    <img src={NameReq} onClick={this.handleClick} alt={"LMF is required"}/>
                </div>
            default:
                return null
        }
    }

    handleClick(){ 
        this.props.onChange("lmfName")
    }
}