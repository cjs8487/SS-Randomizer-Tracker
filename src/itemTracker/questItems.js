import React from 'react'
import questItemBlock from '../assets/quest_items_block.png'

class QuestItems extends React.Component {

    render() {
        return (
            <div id="quest-items">
                <img src={questItemBlock} alt="" width={this.props.styleProps.width} />
            </div>
        );
    }
}

export default QuestItems;