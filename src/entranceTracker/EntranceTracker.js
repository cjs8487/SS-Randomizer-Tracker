/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import yaml from 'js-yaml';
// import EntranceGraph from './EntranceGraph';

class EntranceTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entrances: {},
            selected: {},
        };
        this.onEntranceChange = this.onEntranceChange.bind(this);
        this.row = this.row.bind(this);
        this.fetchEntranceList();
    }

    // eslint-disable-next-line class-methods-use-this
    onEntranceChange(e) {
        const { id, value } = e.target;
        this.setState((state) => {
            state.selected[id] = value;
            return {
                selected: state.selected,
            };
        });
    }

    async fetchEntranceList() {
        const response = await fetch('https://raw.githubusercontent.com/ssrando/ssrando/fc38600187f45d0de04ffe9d769758f812df663e/entrance_table2.yaml');
        const text = await response.text();
        const entrances = await yaml.load(text);
        this.setState({ entrances });
    }

    row({ index }) {
        const { entrances, selected } = this.state;
        const exit = entrances[index];
        const exitText = `${exit.stage} to ${exit['to-stage']}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''}`;
        return (
            <Row key={exitText}>
                <Col>
                    {exitText}
                </Col>
                <Col>
                    <select onChange={this.onEntranceChange} id={exitText}>
                        {
                            _.map(entrances, (entrance) => {
                                const entranceText = `${entrance['to-stage']} (from ${entrance.stage}${entrance.disambiguation ? `, ${entrance.disambiguation}` : ''}${entrance.door ? `, ${entrance.door} Door` : ''})`;
                                if (selected[exitText] === entranceText) {
                                    return (<option key={entranceText} selected>{entranceText}</option>);
                                }
                                return (<option key={entranceText}>{entranceText}</option>);
                            })
                        }
                    </select>
                </Col>
            </Row>
        );
    }

    render() {
        const { entrances } = this.state;
        // console.log(entrances);
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Entrances
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <List itemCount={entrances.length} height={400} itemSize={25}>
                        {this.row}
                    </List>
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
