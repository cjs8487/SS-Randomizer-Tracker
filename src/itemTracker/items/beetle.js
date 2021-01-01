import React from 'react';
import noBeetle from '../../assets/Beetle_Silhouette.png';
import beetle from '../../assets/Beetle_Icon.png';
import hookBeetle from '../../assets/Hook_Beetle_Icon.png';

export default class Beetle extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { current } = this.props;
        const { parent } = this.props;
        switch (current) {
        case 0:
            return (
                <div id="Beetle-item">
                    <img src={noBeetle} onClick={this.handleClick} alt="No Beetle" width={parent.width / 5.2} />
              </div>
            );
        case 1:
            return (
                <div id="Beetle-item">
                    <img src={beetle} onClick={this.handleClick} alt="Beetle" width={parent.width / 5.2} />
              </div>
            );
        case 2:
            return (
                <div id="Beetle-item">
                    <img src={hookBeetle} onClick={this.handleClick} alt="Hook Beetle" width={parent.width / 5.2} />
              </div>
            );
        default:
        }
    }

    handleClick() {
        this.props.onChange('beetle');
    }
}
