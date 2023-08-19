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

    const handleDungeonBindClick = useCallback((params) => {
        const locProps = params.props;
        locProps.bindDungeon(params.data.dungeon);
    });

    const dungeonsAlreadyConnected = Object.values(props.logic.dungeonConnections);

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
                <Submenu label="Bind Dungeon to Entrance">
                    {
                        _.map(dungeons, (dungeonName) => (
                            <Item disabled={dungeonsAlreadyConnected.includes(dungeonName)} onClick={handleDungeonBindClick} data={{ dungeon: dungeonName }}>{dungeonName}</Item>
                        ))
                    }
                    <Item onClick={handleDungeonBindClick} data={{dungeon: ''}}>Unbind Dungeon</Item>
                </Submenu>
            </Menu>
            <Menu id="unbound-dungeon-context">
                <Submenu label="Bind Dungeon to Entrance">
                    {
                        _.map(dungeons, (dungeonName) => (
                            <Item disabled={dungeonsAlreadyConnected.includes(dungeonName)} onClick={handleDungeonBindClick} data={{ dungeon: dungeonName }}>{dungeonName}</Item>
                        ))
                    }
                    <Item onClick={handleDungeonBindClick} data={{dungeon: ''}}>Unbind Dungeon</Item>
                </Submenu>
            </Menu>
        </div>
    );
}
LocationGroupContextMenu.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
}

export default LocationGroupContextMenu;
