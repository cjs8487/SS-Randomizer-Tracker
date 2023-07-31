import _ from 'lodash';
import React, { useCallback } from 'react';
import { Menu, Item, Separator, Submenu } from 'react-contexify';

const bosses = {
    0: 'Ghirahim 1',
    1: 'Scaldera',
    2: 'Moldarach',
    3: 'Koloktos',
    4: 'Tentalus',
    5: 'Ghirahim 2',
};

function LocationGroupContextMenu() {
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
        locProps.setPath(params.data.boss);
    });

    const handleSotsClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setSots(true);
    });

    const handleBarrenClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setBarren(true);
    });

    const handleClearCheck = useCallback((params) => {
        const locProps = params.props;
        locProps.setSots(false);
        locProps.setBarren(false);
        locProps.setPath(6);
    });

    return (
        <Menu id="group-context">
            <Item onClick={checkAll}>Check All</Item>
            <Item onClick={uncheckAll}>Uncheck All</Item>
            <Separator />
            <Submenu label="Set Path">
                {
                    _.map(bosses, (bossName, bossIndex) => (
                        <Item onClick={handlePathClick} data={{ boss: bossIndex }}>{bossName}</Item>
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
