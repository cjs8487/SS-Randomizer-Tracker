import React from 'react';
import noKey from '../../../../assets/dungeons/noSmallKey.png';
import smallKey1 from '../../../../assets/dungeons/SS_Small_Key_Icon.png';

export default class LMFSmall extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('lmfSmall');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="LMF-small-key">
                    <img src={noKey} onClick={this.handleClick} alt="No Small Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="LMF-small-key">
                    <img src={smallKey1} onClick={this.handleClick} alt="Small Key 1" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}
