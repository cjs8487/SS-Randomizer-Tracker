import React from 'react';

class GratitudeCrystals extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange("5 Gratitude Crystal");
    }

    render() {
        const current = this.props.logic.getCrystalCount() >= 1 ? 1 : 0;
        return (
            <div className="item" onClick={this.handleClick}>
                <img src={this.props.images[current]} alt="Gratitude Crystals" width={this.props.imgWidth} />
            </div>
        )
    }
}

export default GratitudeCrystals;