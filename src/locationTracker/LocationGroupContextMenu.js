import _ from 'lodash';
import React, { useCallback } from 'react';
import { Menu, Item, Separator, Submenu } from 'react-contexify';
import PropTypes from 'prop-types';
import Logic from '../logic/Logic';

const bosses = [
    'Ghirahim 1',
    'Scaldera',
    'Moldarach',
    'Koloktos',
    'Tentalus',
    'Ghirahim 2',
]

const dungeons = [
    'Skyview',
    'Earth Temple',
    'Lanayru Mining Facility',
    'Ancient Cistern',
    'Sandship',
    'Fire Sanctuary',
    'Sky Keep',
]

const trials = [
    'Skyloft Silent Realm',
    'Faron Silent Realm',
    'Eldin Silent Realm',
    'Lanayru Silent Realm',
]

function LocationGroupContextMenu(props) {
    const checkAll = useCallback((params) => {
        const locProps = params.props;
        locProps.setAllLocationsChecked(true);
    });

    const uncheckAll = useCallback((params) => {
        const locProps = params.props;
        locProps.setAllLocationsChecked(false);
    });

    const handlePathClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setHint(`Path to ${params.data.boss}`);
    });

    const handleSotsClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setHint('Spirit of the Sword');
    });

    const handleBarrenClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setHint('Barren');
    });

    const handleClearCheck = useCallback((params) => {
        const locProps = params.props;
        locProps.setHint('');
    });

    const handleEntranceBindClick = useCallback((params) => {
        const locProps = params.props;
        locProps.bindEntrance(params.data.region);
    });

    const dungeonsAlreadyConnected = Object.values(props.logic.dungeonConnections);
    const trialsAlreadyConnected = Object.values(props.logic.trialConnections);

    return (
        <div>
            <Menu id="group-context">
                <Item onClick={checkAll}>Check All</Item>
                <Item onClick={uncheckAll}>Uncheck All</Item>
                <Separator />
                <Submenu label="Set Path">
                    {
                        _.map(bosses, (bossName) => (
                            <Item onClick={handlePathClick} data={{ boss: bossName }}>{bossName}</Item>
                        ))
                    }
                </Submenu>
                <Item onClick={handleSotsClick}>Set SotS</Item>
                <Item onClick={handleBarrenClick}>Set Barren</Item>
                <Item onClick={handleClearCheck}>Clear Hint</Item>
            </Menu>
            <Menu id="dungeon-context">
                <Item onClick={checkAll}>Check All</Item>
                <Item onClick={uncheckAll}>Uncheck All</Item>
                <Separator />
                <Submenu label="Set Path">
                    {
                        _.map(bosses, (bossName) => (
                            <Item onClick={handlePathClick} data={{ boss: bossName }}>{bossName}</Item>
                        ))
                    }
                </Submenu>
                <Item onClick={handleSotsClick}>Set SotS</Item>
                <Item onClick={handleBarrenClick}>Set Barren</Item>
                <Item onClick={handleClearCheck}>Clear Hint</Item>
                <Submenu label="Bind Dungeon to Entrance" disabled={props.logic.entranceRando === 'None'}>
                    {
                        _.map(dungeons, (dungeonName) => (
                            <Item disabled={dungeonsAlreadyConnected.includes(dungeonName)} onClick={handleEntranceBindClick} data={{ region: dungeonName }}>{dungeonName}</Item>
                        ))
                    }
                    <Item onClick={handleEntranceBindClick} data={{region: ''}}>Unbind Dungeon</Item>
                </Submenu>
            </Menu>
            <Menu id="unbound-dungeon-context">
                <Submenu label="Bind Dungeon to Entrance">
                    {
                        _.map(dungeons, (dungeonName) => (
                            <Item disabled={dungeonsAlreadyConnected.includes(dungeonName)} onClick={handleEntranceBindClick} data={{ region: dungeonName }}>{dungeonName}</Item>
                        ))
                    }
                    <Item onClick={handleEntranceBindClick} data={{region: ''}}>Unbind Dungeon</Item>
                </Submenu>
            </Menu>
            <Menu id="trial-context">
                <Item onClick={checkAll}>Check All</Item>
                <Item onClick={uncheckAll}>Uncheck All</Item>
                <Separator />
                <Submenu label="Set Path">
                    {
                        _.map(bosses, (bossName) => (
                            <Item onClick={handlePathClick} data={{ boss: bossName }}>{bossName}</Item>
                        ))
                    }
                </Submenu>
                <Item onClick={handleSotsClick}>Set SotS</Item>
                <Item onClick={handleBarrenClick}>Set Barren</Item>
                <Item onClick={handleClearCheck}>Clear Hint</Item>
                <Submenu label="Bind Silent Realm to Entrance" disabled={!props.logic.trialRando}>
                    {
                        _.map(trials, (trialName) => (
                            <Item disabled={trialsAlreadyConnected.includes(trialName)} onClick={handleEntranceBindClick} data={{ region: trialName}}>{trialName}</Item>
                        ))
                    }
                    <Item onClick={handleEntranceBindClick} data={{region: ''}}>Unbind Silent Realm</Item>
                </Submenu>
            </Menu>
            <Menu id="unbound-trial-context">
                <Submenu label="Bind Silent Realm to Entrance" disabled={!props.logic.trialRando}>
                    {
                        _.map(trials, (trialName) => (
                            <Item disabled={trialsAlreadyConnected.includes(trialName)} onClick={handleEntranceBindClick} data={{ region: trialName}}>{trialName}</Item>
                        ))
                    }
                    <Item onClick={handleEntranceBindClick} data={{region: ''}}>Unbind Silent Realm</Item>
                </Submenu>
            </Menu>
        </div>
    );
}
LocationGroupContextMenu.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
}

export default LocationGroupContextMenu;
