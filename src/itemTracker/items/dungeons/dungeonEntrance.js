import React from 'react';
import PropTypes from 'prop-types';
import Check from '../../../assets/Entrance.png';
import Cross from '../../../assets/No_Entrance.png';

class DungeonEntrance extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange(this.props.entranceItem);
    }

    render() {
        const { current } = this.props;
        switch (current) {
        case 0:
            return (
                <div id={`${this.props.dungeonName}-Entrance`}>
                    <img src={Cross} onClick={this.handleClick} alt="No entrance set" />
                </div>
            );
        case 1:
            return (
                <div id={`${this.props.dungeonName}-Entrance`}>
                    <img src={Check} onClick={this.handleClick} alt="Entrance set" />
                </div>
            );
        default:
            return null;
        }
    }
}

DungeonEntrance.propTypes = {
    dungeonName: PropTypes.string.isRequired,
    entranceItem: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
};

export default DungeonEntrance;
