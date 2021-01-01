import React from 'react';
import noKey from '../../../../assets/dungeons/noSmallKey.png';
import smallKey1 from '../../../../assets/dungeons/SS_Small_Key_Icon.png';
import smallKey2 from '../../../../assets/dungeons/2_smallKey.png';
import smallKey3 from '../../../../assets/dungeons/3_smallKey.png';

export default class FS_Small extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('fsSmall');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="FS-small-key">
                    <img src={noKey} onClick={this.handleClick} alt="No Small Key" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="FS-small-key">
                    <img src={smallKey1} onClick={this.handleClick} alt="Small Key 1" width={this.props.colWidth} />
                </div>
            );
        case 2:
            return (
                <div id="FS-small-key">
                    <img src={smallKey2} onClick={this.handleClick} alt="Small Key 2" width={this.props.colWidth} />
                </div>
            );
        case 3:
            return (
                <div id="FS-small-key">
                    <img src={smallKey3} onClick={this.handleClick} alt="Small Key 2" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}
