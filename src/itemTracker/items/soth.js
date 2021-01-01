import React from 'react';
import noSoth from '../../assets/songs/No_Soth.png';
import soth1 from '../../assets/songs/SOTH1.png';
import soth2 from '../../assets/songs/SOTH2.png';
import soth4 from '../../assets/songs/SOTH4.png';

export default class Soth extends React.Component {
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
                <div id="Soth-item">
                    <img src={noSoth} onClick={this.handleClick} alt="No Soth" width={parent.width / 2.62} />
                </div>
            );
        case 1:
            return (
                <div id="Soth-item">
                    <img src={soth1} onClick={this.handleClick} alt="Soth" width={parent.width / 2.62} />
                </div>
            );
        case 2:
            return (
                <div id="Soth-item">
                    <img src={soth2} onClick={this.handleClick} alt="Soth" width={parent.width / 2.62} />
                </div>
            );
        case 3:
            return (
                <div id="Soth-item">
                    <img src={soth4} onClick={this.handleClick} alt="Soth" width={parent.width / 2.62} />
                </div>
            );
        default:
            return null;
        }
    }

    handleClick() {
        this.props.onChange('soth');
    }
}
