import _ from 'lodash';
import React, { useCallback } from 'react';
import { Menu, Item, Separator, Submenu } from 'react-contexify';

import hintItems from '../data/hintItems.json';

function LocationContextMenu() {
    const handleCheckClick = useCallback((params) => {
        const locProps = params.props;
        locProps.handler(locProps.group, locProps.location, true);
    });

    const handleUncheckClick = useCallback((params) => {
        const locProps = params.props;
        locProps.handler(locProps.group, locProps.location, false);
    });

    const handleSetItemClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setItem(params.data.item);
    });

    const handleClearItemClick = useCallback((params) => {
        const locProps = params.props;
        locProps.setItem('');
    });

    return (
        <Menu id="location-context">
            <Item onClick={handleCheckClick}>Check</Item>
            <Item onClick={handleUncheckClick}>Uncheck</Item>
            <Separator />
            <Submenu label="Set Item">
                {
                    _.map(hintItems, (items, category) => (
                        <Submenu key={category} label={category}>
                            {
                                _.map(items, (listItem) => (
                                    <Item key={listItem} onClick={handleSetItemClick} data={{ item: listItem }}>{listItem}</Item>
                                ))
                            }
                        </Submenu>
                    ))
                }
            </Submenu>
            <Item onClick={handleClearItemClick}>Clear Item</Item>
        </Menu>
    );
}

export default LocationContextMenu;
