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
            left: 0,
            top: 0,
            margin: '1%',
        };

        const bWheelStyle = {
            position: 'fixed',
            width: 2 * this.props.styleProps.width / 3,
            left: (this.props.styleProps.width / 8), // don't ask, this has to be like this so the b-wheel is somewhat centered
            top: this.props.styleProps.height / 2, // swordBlockStyle.height would be preferable but is not declared
            margin: '1%',
        };

        const songBlockStyle = {
            position: 'fixed',
            width: this.props.styleProps.width / 2.5,
            left: swordBlockStyle.width,
            top: 0,
            margin: '1%',
            // border: '3px solid #73AD21'
        };

        const questItemsStyle = {
            width: this.props.styleProps.width / 2.5,
            height: this.props.styleProps.height / 7,
        };

        const additionalItemsStyle = {
            width: this.props.styleProps.width / 2.5,
        };

        return (
            <div id="itemTracker">
                {/* <Container fluid> */}
                <Row>
                    <Col>
                        <div id="swordBlock">
                            <SwordBlock styleProps={swordBlockStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                        </div>
                    </Col>
                    <Col>
                        <div id="songBlock">
                            <SongBlock styleProps={songBlockStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} />
                        </div>
                    </Col>
                </Row>
                <Row
                    style={
                        {
                            padding: '2%',
                            height: '10%',
                        }
                    }
                >
                    <Col>
                        <QuestItems styleProps={questItemsStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                    </Col>
                    <Col>
                        <AdditionalItems styleProps={additionalItemsStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} colorScheme={this.props.colorScheme} />
                    </Col>
                </Row>
                <Row>
                    <Col id="bWheel">
                        <BWheel styleProps={bWheelStyle} logic={this.props.logic} handleItemClick={this.props.handleItemClick} />
                    </Col>
                </Row>

                {/* </Container> */}
            </div>
        );
    }
}

ItemTracker.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    styleProps: PropTypes.shape().isRequired,
    colorScheme: PropTypes.shape(ColorScheme).isRequired,
};
export default ItemTracker;
