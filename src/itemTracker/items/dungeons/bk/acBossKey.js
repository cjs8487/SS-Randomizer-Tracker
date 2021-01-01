import React from 'react';
import BK from '../../../../assets/dungeons/SS_Blessed_Idol_Icon.png';
import noBK from '../../../../assets/dungeons/ac_noBossKey.png';

export default class ACBossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('acBossKey');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="AC-BK">
                    <img src={noBK} onClick={this.handleClick} alt="No AC Boss Key" width={this.props.colWidth} />
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
}
