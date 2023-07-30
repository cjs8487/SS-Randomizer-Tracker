import _ from 'lodash';
import React, { useCallback } from 'react';
import { Menu, Item, Separator, Submenu } from 'react-contexify';

const bosses = [
    'Ghirahim 1',
    'Scaldera',
    'Moldarach',
    'Koloktos',
    'Tentalus',
    'Ghirahim 2',
]

function LocationGroupContextMenu() {
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

    return (
        <Menu id="group-context">
            <Item disabled>Check All</Item>
            <Item disabled>Uncheck All</Item>
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
    );
}

export default LocationGroupContextMenu;
