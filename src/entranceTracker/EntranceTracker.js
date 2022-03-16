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
            const response = await fetch('https://raw.githubusercontent.com/ssrando/ssrando/fc38600187f45d0de04ffe9d769758f812df663e/entrance_table2.yaml');
            const text = await response.text();
            const allExits = await yaml.load(text);
            _.forEach(allExits, (exit) => {
                exit.exitText = `${exit.stage} to ${exit['to-stage']}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''}`;
                exit.entranceText = `${exit['to-stage']} (from ${exit.stage}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''})`;
            });
            const sorted = _.sortBy(allExits, (exit) => exit.stage);
            const entranceList = [];
            _.forEach(allExits, (exit) => {
                entranceList.push({ value: exit.entranceText, label: exit.entranceText });
            });
            const sortedEntrances = _.sortBy(entranceList, (entrance) => entrance.value);
            setExits(sorted);
            setDisplayedExits(sorted);
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
            setExitSearch(selectedOption.value.toLowerCase().split('(')[0]);
        }
    };

    // onSearchChange
    useEffect(() => {
        let finalExits = _.clone(exits);
        if (exitSearch !== '') {
            finalExits = _.filter(finalExits, (exit) => exit.exitText.toLowerCase().includes(exitSearch.toLowerCase()));
        }
        if (entranceSearch !== '') {
            finalExits = _.filter(finalExits, (exit) => {
                if (!selected[exit.exitText]) {
                    return true;
                }
                return selected[exit.exitText].value.toLowerCase().includes(entranceSearch.toLowerCase());
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
        const exitText = `${exit.stage} to ${exit['to-stage']}${exit.disambiguation ? `, ${exit.disambiguation}` : ''}${exit.door ? `, ${exit.door} Door` : ''}`;
        return (
            <Row key={exit.exitText} style={{ ...style, borderBottom: '1px solid black', paddingTop: '1%' }}>
                <Col>
                    {exit.exitText}
                </Col>
                <Col>
                    <Select value={selected[exitText]} onChange={onEntranceChange} options={entrances} name={exitText} />
                </Col>
                <Col xs="auto">
                    <Button disabled={!selected[exitText]} onClick={() => setExitSearch(selected[exitText].value.split('(')[0])}>Go to</Button>
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
};

export default EntranceTracker;
