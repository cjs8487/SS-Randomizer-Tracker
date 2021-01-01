import React from 'react';
import BK from '../../../../assets/dungeons/SS_Mysterious_Crystals_Icon.png';
import No_BK from '../../../../assets/dungeons/fs_noBossKey.png';

export default class FS_BossKey extends React.Component {
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
                <div id="FS-BK">
                    <img src={No_BK} onClick={this.handleClick} alt="No FS Boss Key" width={this.props.colWidth} />
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

    handleClick() {
        this.props.onChange('fsBossKey');
    }
}
