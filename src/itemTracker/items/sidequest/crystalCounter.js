import React from 'react';

class CrystalCounter extends React.Component {

    render() {
        return (
            <p style={{fontSize: "xx-large", margin: 0}}>{this.props.current*5}</p>
        );
    }

    handleClick() {
        this.props.onChange("cBeetle")
    }
}

export default CrystalCounter;