import React from 'react';
import BK from '../../../../assets/dungeons/SS_Golden_Carving_Icon.png';
import noBK from '../../../../assets/dungeons/sv_noBossKey.png';

export default class SVBossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('svBossKey');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="SV-BK">
                    <img src={noBK} onClick={this.handleClick} alt="No SV Boss Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="SV-BK">
                    <img src={BK} onClick={this.handleClick} alt="SV Boss Key" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}
