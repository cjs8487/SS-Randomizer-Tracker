import React from 'react';
import BK from '../../../../assets/dungeons/SS_Blessed_Idol_Icon.png';
import No_BK from '../../../../assets/dungeons/ac_noBossKey.png';

export default class AC_BossKey extends React.Component {
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
              <div id="AC-BK">
                  <img src={No_BK} onClick={this.handleClick} alt="No AC Boss Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
              <div id="AC-BK">
                  <img src={BK} onClick={this.handleClick} alt="AC Boss Key" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }

    handleClick() {
        this.props.onChange('acBossKey');
    }
}
