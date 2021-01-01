import React from 'react';
import noBallad from '../../assets/songs/No_Song.png';
import ballad from '../../assets/songs/Ballad_of_the_Goddess.png';

export default class Ballad extends React.Component {
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
              <div id="Ballad-item">
                  <img src={noBallad} onClick={this.handleClick} alt="No Ballad" width={parent.width / 7} />
                </div>
            );
        case 1:
            return (
              <div id="Ballad-item">
                  <img src={ballad} onClick={this.handleClick} alt="Ballad" width={parent.width / 7} />
                </div>
            );
        default:
            return null;
        }
    }

    handleClick() {
        this.props.onChange('ballad');
    }
}
