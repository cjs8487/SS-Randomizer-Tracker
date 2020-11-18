import React from 'react';
import noSeaChart from '../../../assets/dungeons/noSmallKey.png'
import seaChart from '../../../assets/dungeons/1_smallKey.png'

class CavesKey extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        switch (this.props.current) {
            case 0:
                return (
                    <img src={noSeaChart} alt="Lanayru Caves Small Key" onClick={this.handleClick} width={this.props.styleProps.width/4}/>
                );
            case 1:
                return (
                    <img src={seaChart} alt="Lanayru Caves Small Key" onClick={this.handleClick} width={this.props.styleProps.width/4}/>
                );
            default:
                return null;
        }
    }

    handleClick() {
        this.props.onChange("cavesKey")
    }
}

export default CavesKey;