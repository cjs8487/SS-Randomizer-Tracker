import React from 'react';
import PropTypes from 'prop-types';
import './itemTracker.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BWheel from './BWheel';
import SwordBlock from './SwordBlock';
import SongBlock from './SongBlock';
import QuestItems from './QuestItems';
import AdditionalItems from './AdditionalItems';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

class ItemTracker extends React.Component {
    render() {
        const swordBlockStyle = {
            position: 'fixed',
            width: this.props.styleProps.width / 2.5,
            height: this.props.styleProps.height / 3,
            left: 0,
            top: 0,
            margin: '1%',
        };

        const songBlockStyle = {
            position: 'fixed',
            width: this.props.styleProps.width / 2.3,
            left: swordBlockStyle.width * 1.1,
            margin: '1%',
            // border: '3px solid #73AD21'
        };

        const bWheelStyle = {
            position: 'fixed',
            width: 2 * this.props.styleProps.width / 3,
            left: swordBlockStyle.width / 3, // don't ask, this has to be like this so the b-wheel is somewhat centered
            top: swordBlockStyle.height * 1.1, // swordBlockStyle.height would be preferable but is not declared
            margin: '1%',
        };

        const questItemsStyle = {
            position: 'fixed',
            width: this.props.styleProps.width / 2.5,
            top: swordBlockStyle.height * 2.4,
            margin: '1%',
        };

        const additionalItemsStyle = {
            position: 'fixed',
            width: this.props.styleProps.width / 2.5,
            top: questItemsStyle.top - questItemsStyle.width / 9,
            left: questItemsStyle.width * 1.2,
            margin: '1%',
        };

        return (
            <table>
                <tbody>
                    <tr>
                        <td style={swordBlockStyle}>
                            <div id="swordBlock">
                                <SwordBlock styleProps={swordBlockStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                            </div>
                        </td>
                        <td style={songBlockStyle}>
                            <div id="songBlock">
                                <SongBlock styleProps={songBlockStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={bWheelStyle}>
                            <div id="bWheel">
                                <BWheel styleProps={bWheelStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={questItemsStyle}>
                            <QuestItems styleProps={questItemsStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                        </td>
                        <td style={additionalItemsStyle}>
                            <AdditionalItems styleProps={additionalItemsStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

ItemTracker.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    styleProps: PropTypes.shape().isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
};
export default ItemTracker;
