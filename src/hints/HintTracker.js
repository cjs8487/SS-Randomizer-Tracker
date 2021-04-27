import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import ColorScheme from '../customization/ColorScheme';
import Logic from '../logic/Logic';
import hintableLocations from '../data/hintablelocations.json';
import hintItems from '../data/hintItems.json';

class HintTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hints: {},
        };
    }

    locationChanged(hint, location) {
        _.set(this.state.hints, [hint, 'location'], location);
        this.forceUpdate();
    }

    itemChanged(hint, item) {
        _.set(this.state.hints, [hint, 'item'], item);
        this.forceUpdate();
    }

    render() {
        const style = { background: this.props.colorScheme.background, color: this.props.colorScheme.text };
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton style={style}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Hints
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid" style={style}>
                    <Container>
                        {
                            _.map(this.props.logic.getHintLocations(), (hintLocation) => (
                                <Row>
                                    <Col>
                                        {hintLocation.name}
                                    </Col>
                                    <Col>
                                        <Form.Label>Hinted Location</Form.Label>
                                        <Form.Control as="select" onChange={(e) => this.locationChanged(hintLocation.name, e.target.value)}>
                                            <option>Unknown</option>
                                            {
                                                _.map(hintableLocations, (location) => (
                                                    <option selected={_.get(this.state.hints, [hintLocation.name, 'location']) === location}>{location}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Hinted Item</Form.Label>
                                        <Form.Control as="select" onChange={(e) => this.itemChanged(hintLocation.name, e.target.value)}>
                                            {
                                                _.map(hintItems, (items, groupName) => (
                                                    <optgroup label={groupName}>
                                                        {
                                                            _.map(items, (item) => (
                                                                <option selected={_.get(this.state.hints, [hintLocation.name, 'item']) === item}>{item}</option>
                                                            ))
                                                        }
                                                    </optgroup>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer style={style}>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

HintTracker.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
};

export default HintTracker;
