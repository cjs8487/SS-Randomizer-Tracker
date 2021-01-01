import React from 'react';
import BK from '../../../../assets/dungeons/SS_Dragon_Sculpture_Icon.png';
import noBK from '../../../../assets/dungeons/et_noBossKey.png';

export default class ETBossKey extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('etBossKey');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="ET-BK">
                    <img src={noBK} onClick={this.handleClick} alt="No ET Boss Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="ET-BK">
                    <img src={BK} onClick={this.handleClick} alt="ET Boss Key" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}
