import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import Select from 'react-select';
import yaml from 'js-yaml';
// import EntranceGraph from './EntranceGraph';

class EntranceTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exits: [],
            entrances: [],
            displayedExits: {},
            selected: {},
            // hiddenEntrances: [],
        };
        this.onEntranceChange = this.onEntranceChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.fetchEntranceList();
    }

    onEntranceChange(selectedOption, meta) {
        const { name } = meta;
        this.setState((state) => {
            const selected = { ...state.selected };
            selected[name] = selectedOption;
            let entrances = [...state.entrances];
            const old = state.selected[name];
            if (old) {
                entrances.push({ value: old.value, label: old.label });
                entrances = _.sortBy(entrances, (entrance) => entrance.value);
            }
            _.remove(entrances, (entrance) => entrance.value === selectedOption.value);
            return { selected, entrances };
        });
    }

    onSearchChange(e) {
        const { value } = e.target;
        this.setState((state) => ({ displayedExits: _.filter(state.exits, (exit) => exit.exitText.toLowerCase().includes(value.toLowerCase())) }));
    }

    async fetchEntranceList() {
        const response = await fetch('https://raw.githubusercontent.com/ssrando/ssrando/fc38600187f45d0de04ffe9d769758f812df663e/entrance_table2.yaml');
        const text = await response.text();
        const exits = await yaml.load(text);
        _.forEach(exits, (exit) => {
            exit.exitText = `${exit.stage} to ${exit['to-stage']}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''}`;
            exit.entranceText = `${exit['to-stage']} (from ${exit.stage}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''})`;
        });
        const sorted = _.sortBy(exits, (exit) => exit.stage);
        const entranceList = [];
        _.forEach(exits, (exit) => {
            entranceList.push({ value: exit.entranceText, label: exit.entranceText });
        });
        const sortedEntrances = _.sortBy(entranceList, (entrance) => entrance.value);
        this.setState({ exits: sorted, displayedExits: sorted, entrances: sortedEntrances });
    }

    render() {
        const { displayedExits, selected, entrances } = this.state;

        const row = ({ index, style }) => {
            const exit = displayedExits[index];
            const exitText = `${exit.stage} to ${exit['to-stage']}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''}`;
            return (
                <Row key={exit.exitText} style={{ ...style, borderBottom: '1px solid black', paddingTop: '1%' }}>
                    <Col>
                        {exit.exitText}
                    </Col>
                    <Col>
                        <Select value={selected[exitText]} onChange={this.onEntranceChange} options={entrances} name={exitText} />
                    </Col>
                </Row>
            );
        };
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" style={{ width: '90%' }}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Entrances
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div style={{ paddingBottom: '3%' }}>
                        <input type="search" placeholder="Search entrances" onChange={this.onSearchChange} />
                    </div>
                    <List itemCount={displayedExits.length} height={600} itemSize={60}>
                        {row}
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
