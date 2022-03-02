import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import yaml from 'js-yaml';
// import EntranceGraph from './EntranceGraph';

class EntranceTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entrances: {},
        };
        this.fetchEntranceList();
    }

    async fetchEntranceList() {
        const response = await fetch('https://raw.githubusercontent.com/ssrando/ssrando/fc38600187f45d0de04ffe9d769758f812df663e/entrance_table2.yaml');
        const text = await response.text();
        const data = yaml.load(text);
        this.setState({ entrances: data });
    }

    render() {
        const { entrances } = this.state;
        const selectElement = (
            <select>
                {
                    _.map(entrances, (entrance) => (
                        <option>{`${entrance['to-stage']} (from ${entrance.stage})`}</option>
                    ))
                }
            </select>
        );
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Entrances
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {
                        _.map(entrances, (entrance) => (
                            <Row>
                                <Col>
                                    {`${entrance.stage} to ${entrance['to-stage']}`}
                                </Col>
                                <Col>
                                    {selectElement}
                                </Col>
                            </Row>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            // <EntranceGraph />
        );
    }
}

EntranceTracker.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default EntranceTracker;
