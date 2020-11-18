import React from 'react';
import noSeaChart from '../../../assets/no_sea_chart.png'
import seaChart from '../../../assets/sea_chart.png'

class SeaChart extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        switch (this.props.current) {
            case 0:
                return (
                    <img src={noSeaChart} alt="Sea Chart" onClick={this.handleClick} width={this.props.styleProps.width/6.5}/>
                );
            case 1:
                return (
                    <img src={seaChart} alt="Sea Chart" onClick={this.handleClick} width={this.props.styleProps.width/6.5}/>
                );
            default:
                return null;
        }
    }

    handleClick() {
        this.props.onChange("seaChart")
    }
}

export default SeaChart;