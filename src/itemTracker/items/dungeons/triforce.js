import React from 'react';
import PropTypes from 'prop-types';
import noTriforce from '../../../assets/dungeons/noTriforce.png';
import triforce1 from '../../../assets/dungeons/TriforcePiece.png';
import triforce2 from '../../../assets/dungeons/2_TriforcePiece.png';
import triforce3 from '../../../assets/dungeons/3_TriforcePiece.png';

class Triforce extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange('triforce');
    }

    render() {
        const { current } = this.props;
        switch (current) {
        case 0:
            return (
                <div id="triforce-pieces">
                    <img src={noTriforce} onClick={this.handleClick} alt="No Triforce Pieces" width={this.props.colWidth} />
                </div>
            );
        case 1:
            return (
                <div id="triforce-pieces">
                    <img src={triforce1} onClick={this.handleClick} alt="1 Triforce Pieces" width={this.props.colWidth} />
                </div>
            );
        case 2:
            return (
                <div id="triforce-pieces">
                    <img src={triforce2} onClick={this.handleClick} alt="2 Triforce Pieces" width={this.props.colWidth} />
                </div>
            );
        case 3:
            return (
                <div id="triforce-pieces">
                    <img src={triforce3} onClick={this.handleClick} alt="3 Triforce Pieces" width={this.props.colWidth} />
                </div>
            );
        default:
            return null;
        }
    }
}

Triforce.propTypes = {
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    colWidth: PropTypes.number.isRequired,
};

export default Triforce;
