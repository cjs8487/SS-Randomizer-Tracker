import React from 'react';
import noBow from '../../assets/Bow_Silhouette.png';
import bow from '../../assets/Bow_Icon.png';

export default class Bow extends React.Component {
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
              <div id="Bow-item">
                  <img src={noBow} onClick={this.handleClick} alt="No Bow" width={parent.width / 5.5} />
                </div>
            );
        case 1:
            return (
              <div id="Bow-item">
                  <img src={bow} onClick={this.handleClick} alt="Bow" width={parent.width / 5.5} />
                </div>
            );
        default:
            return null;
        }
    }

    handleClick() {
        this.props.onChange('bow');
    }
}
