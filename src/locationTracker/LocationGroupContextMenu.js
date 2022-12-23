// import _ from 'lodash';
import React, { useCallback } from 'react';
import { Menu, Item, Separator } from 'react-contexify';

function LocationGroupContextMenu() {
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
    });

    return (
        <Menu id="group-context">
            <Item disabled>Check All</Item>
            <Item disabled>Uncheck All</Item>
            <Separator />
            <Item onClick={handleSotsClick}>Set SotS</Item>
            <Item onClick={handleBarrenClick}>Set Barren</Item>
            <Item onClick={handleClearCheck}>Clear Hint</Item>
        </Menu>
    );
}

export default LocationGroupContextMenu;
