import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormCheck, FormControl } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import Select from 'react-select';
import yaml from 'js-yaml';
// import EntranceGraph from './EntranceGraph';

function EntranceTracker(props) {
    const [exits, setExits] = useState([]);
    const [entrances, setEntrances] = useState([]);
    const [displayedExits, setDisplayedExits] = useState({});
    const [selected, setSelected] = useState({});
    const [exitSearch, setExitSearch] = useState('');
    const [entranceSearch, setEntranceSeach] = useState('');
    const [clickthrough, setClickthrough] = useState(true);

    // runs on mount
    useEffect(() => {
        async function fetchEntranceList() {
            const response = await fetch(`https://raw.githubusercontent.com/ssrando/ssrando/${props.source}/entrances.yaml`);
            const text = await response.text();
            const allExits = await yaml.load(text);
            const exitList = [];
            const entranceList = [];
            _.forEach(allExits, (data, name) => {
                if (data.disabled !== true && name !== 'Start') {
                    let newName = name;
                    if (!name.includes('-')) {
                        newName = `Skyloft - ${name}`;
                    }
                    if (data.type === 'exit') {
                        exitList.push({ value: newName, label: newName });
                    } else {
                        entranceList.push({ value: newName, label: newName });
                    }
                }
            });
            // Keep the Start exit on top for convenience
            const sortedExits = [{ value: 'Start', label: 'Start' }, ..._.sortBy(exitList, (exit) => exit.value)];
            const sortedEntrances = _.sortBy(entranceList, (entrance) => entrance.value);
            setExits(sortedExits);
            setDisplayedExits(sortedExits);
            setEntrances(sortedEntrances);
        }
        fetchEntranceList();
    }, []);

    // onEntranceChange
    const onEntranceChange = (selectedOption, meta) => {
        const { name } = meta;
        selected[name] = selectedOption;
        setSelected(selected);
        const old = selected[name];
        if (old) {
            entrances.push({ value: old.value, label: old.label });
        }
        _.remove(entrances, (entrance) => entrance.value === selectedOption.value);
        setEntrances(_.sortBy(entrances, (entrance) => entrance.value));

        if (clickthrough) {
            // search for exits that share the same subregion as the entrance the user selected
            setExitSearch(`${selectedOption.value.toLowerCase().substr(0, selectedOption.value.lastIndexOf('-'))}-`);
        }
    };

    // onSearchChange
    useEffect(() => {
        let finalExits = _.clone(exits);
        if (exitSearch !== '') {
            finalExits = _.filter(finalExits, (exit) => exit.label.toLowerCase().includes(exitSearch.toLowerCase()));
        }
        if (entranceSearch !== '') {
            finalExits = _.filter(finalExits, (exit) => {
                if (!selected[exit.label]) {
                    // filter out unbound exits
                    return false;
                }
                return selected[exit.label].value.toLowerCase().includes(entranceSearch.toLowerCase());
            });
        }
        setDisplayedExits(finalExits);
    }, [exitSearch, entranceSearch]);

    const clearFilters = () => {
        setExitSearch('');
        setEntranceSeach('');
    };

    const row = ({ index, style }) => {
        const exit = displayedExits[index];
        const exitText = exit.label;
        return (
            <Row key={exit.label} style={{ ...style, borderBottom: '1px solid black', paddingTop: '1%' }}>
                <Col>
                    {exit.label}
                </Col>
                <Col>
                    <Select value={selected[exitText]} onChange={onEntranceChange} options={entrances} name={exitText} />
                </Col>
                <Col xs="auto">
                    <Button disabled={!selected[exitText]} onClick={() => setExitSearch(`${selected[exitText].value.substr(0, selected[exitText].value.lastIndexOf('-'))}-`)}>Go to</Button>
                </Col>
            </Row>
        );
    };
    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" style={{ width: '90%' }}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Entrances
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Row style={{ paddingBottom: '3%' }}>
                    <Col>
                        <FormControl type="search" placeholder="Search exits" onChange={(e) => setExitSearch(e.target.value)} value={exitSearch} />
                    </Col>
                    <Col className="vr" style={{ background: 'white' }} />
                    <Col>
                        <FormControl type="search" placeholder="Search entrances" onChange={(e) => setEntranceSeach(e.target.value)} value={entranceSearch} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormCheck
                            type="switch"
                            label="Clickthrough"
                            id="clickthrough"
                            checked={clickthrough}
                            onChange={() => setClickthrough(!clickthrough)}
                        />
                    </Col>
                    <Col className="vr" style={{ background: 'white' }} />
                    <Col style={{ justifyContent: 'end' }}>
                        <Button onClick={clearFilters}>Clear Filters</Button>
                    </Col>
                </Row>
                <List itemCount={displayedExits.length} height={600} itemSize={60}>
                    {row}
                </List>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        // <EntranceGraph />
    );
}

EntranceTracker.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    source: PropTypes.string.isRequired,
};

export default EntranceTracker;
