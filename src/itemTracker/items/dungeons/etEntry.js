import React from 'react';
import PropTypes from 'prop-types';
import noEntry from '../../../assets/dungeons/et_noEntryPieces.png';
import entry1 from '../../../assets/dungeons/SS_Piece_of_the_Key_Icon.png';
import entry2 from '../../../assets/dungeons/et_2piece.png';
import entry3 from '../../../assets/dungeons/et_3piece.png';
import entry4 from '../../../assets/dungeons/et_4piece.png';
import entry5 from '../../../assets/dungeons/SS_Pieces_of_the_Key_Icon.png';

class ETEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.incrementKeyCount.bind(this);
    }

    incrementKeyCount() {
        this.props.onChange('etEntry');
    }

    render() {
        switch (this.props.current) {
        case 0:
            return (
                <div id="ET-entry-key" onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                    <img src={noEntry} alt="No ET entry key pieces" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="ET-entry-key" onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                    <img src={entry1} alt="1 ET entry key piece" width={this.props.colWidth} />
                </div>
            );
        case 2:
            return (
                <div id="ET-entry-key" onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                    <img src={entry2} alt="2 ET entry key pieces" width={this.props.colWidth} />
                </div>
            );
        case 3:
            return (
                <div id="ET-entry-key" onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                    <img src={entry3} alt="3 ET entry key pieces" width={this.props.colWidth} />
                </div>
            );
        case 4:
            return (
                <div id="ET-entry-key" onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                    <img src={entry4} alt="4 ET entry key pieces" width={this.props.colWidth} />
                </div>
            );
        case 5:
            return (
                <div id="ET-entry-key" onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                    <img src={entry5} alt="5 ET entry key pieces" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}

ETEntry.propTypes = {
    current: PropTypes.number.isRequired,
    colWidth: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ETEntry;
