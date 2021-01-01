import React from 'react';
import BK from '../../../../assets/dungeons/SS_Ancient_Circuit_Icon.png';
import noBK from '../../../../assets/dungeons/lmf_noBossKey.png';

export default class LMF_BossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('lmfBossKey');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="LMF-BK">
                    <img src={noBK} onClick={this.handleClick} alt="No LMF Boss Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="LMF-BK">
                    <img src={BK} onClick={this.handleClick} alt="LMF Boss Key" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}
