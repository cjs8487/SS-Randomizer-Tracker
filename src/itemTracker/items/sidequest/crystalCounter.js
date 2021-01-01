import React from 'react';

class CrystalCounter extends React.Component {
    render() {
        return (
            <p style={{ fontSize: 'xx-large', margin: 0, color: this.props.colorScheme.text }}>{this.props.current * 5}</p>
        );
    }

    handleClick() {
        this.props.onChange('cBeetle');
    }
}

export default CrystalCounter;
