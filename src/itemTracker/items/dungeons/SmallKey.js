import React from 'react';
import PropTypes from 'prop-types';
import noKey from '../../../assets/dungeons/noSmallKey.png';
import smallKey1 from '../../../assets/dungeons/SS_Small_Key_Icon.png';
import smallKey2 from '../../../assets/dungeons/2_smallKey.png';
import smallKey3 from '../../../assets/dungeons/3_smallKey.png';

class SmallKey extends React.Component {
    constructor(props) {
        super(props);
        this.incrementKeyCount = this.incrementKeyCount.bind(this);
    }

    incrementKeyCount() {
        this.props.onChange(this.props.keyName);
    }

    render() {
        return (
            <div onClick={this.incrementKeyCount} onKeyDown={this.incrementKeyCount} role="button" tabIndex={0}>
                {
                    this.props.current === 0 &&
                    <img src={noKey} alt={`${this.props.altName} - ${this.props.current} small keys`} width={this.props.colWidth} />
                }
                {
                    this.props.current === 1 &&
                    <img src={smallKey1} alt={`${this.props.altName} - ${this.props.current} small keys`} width={this.props.colWidth} />
                }
                {
                    this.props.current === 2 &&
                    <img src={smallKey2} alt={`${this.props.altName} - ${this.props.current} small keys`} width={this.props.colWidth} />
                }
                {
                    this.props.current === 3 &&
                    <img src={smallKey3} alt={`${this.props.altName} - ${this.props.current} small keys`} width={this.props.colWidth} />
                }
            </div>
        );
    }
}

SmallKey.propTypes = {
    keyName: PropTypes.string.isRequired,
    altName: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    colWidth: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SmallKey;
