import React from 'react'
import _ from 'lodash'

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange(this.props.itemName);
    }

    render() {
        const current = this.props.logic.getItem(this.props.itemName);
        const className = this.props.ignoreItemClass ? "" : "item"
        return (
            <div className={className} onClick={this.handleClick}>
                <img src={this.props.images[current]} alt={this.props.itemName} width={this.props.imgWidth} />
            </div>
        )
    }
}

export default Item;