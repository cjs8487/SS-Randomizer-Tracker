import React from 'react';
import BK from '../../../../assets/dungeons/SS_Mysterious_Crystals_Icon.png';
import noBK from '../../../../assets/dungeons/fs_noBossKey.png';

export default class FSBossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('fsBossKey');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="FS-BK">
                    <img src={noBK} onClick={this.handleClick} alt="No FS Boss Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="FS-BK">
                    <img src={BK} onClick={this.handleClick} alt="FS Boss Key" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}
