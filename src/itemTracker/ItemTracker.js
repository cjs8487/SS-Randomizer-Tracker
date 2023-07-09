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
        const maxHeight = this.props.styleProps.height;
        const aspectRatio = 0.65;
        let wid = this.props.styleProps.width;
        if (wid > maxHeight * aspectRatio) {
            wid = maxHeight * aspectRatio; // ensure the tracker isn't so wide that it ends up too tall
        }
        const swordBlockStyle = {
            position: 'fixed',
            height: 0,
            width: wid / 2.5,
            left: 0,
            top: 0,
            margin: '1%',
        };

        const songBlockStyle = {
            position: 'fixed',
            width: wid / 2.5,
            left: swordBlockStyle.width * 1.1,
            margin: '1%',
            // border: '3px solid #73AD21',
        };

        const bWheelStyle = {
            position: 'fixed',
            width: 2 * wid / 3,
            left: swordBlockStyle.width * 0.3, // don't ask, this has to be like this so the b-wheel is somewhat centered
            top: wid * 0.8,
            margin: '0%',
        };

        const additionalItemsStyle = {
            position: 'fixed',
            width: wid / 2.5,
            top: wid * 0.55,
            left: wid * 0.44,
            margin: '1%',
        };

        const questItemsStyle = {
            position: 'fixed',
            width: wid / 2.5,
            top: additionalItemsStyle.top + additionalItemsStyle.top / 12,
            left: 0,
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
                        <td style={questItemsStyle}>
                            <QuestItems styleProps={questItemsStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                        </td>
                        <td style={additionalItemsStyle}>
                            <AdditionalItems styleProps={additionalItemsStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={bWheelStyle}>
                            <div id="bWheel">
                                <BWheel styleProps={bWheelStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} />
                            </div>
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
