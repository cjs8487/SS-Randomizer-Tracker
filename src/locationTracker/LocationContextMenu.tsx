import _ from 'lodash';
import { useCallback } from 'react';
import { Menu, Item, Separator, Submenu, ItemParams } from 'react-contexify';

import hintItems from '../data/hintItems.json';

export default function LocationContextMenu() {
    const handleCheckClick = useCallback((params: ItemParams) => {
        const locProps = params.props;
        locProps.handler(locProps.group, locProps.location, true);
    }, []);

    const handleUncheckClick = useCallback((params: ItemParams) => {
        const locProps = params.props;
        locProps.handler(locProps.group, locProps.location, false);
    }, []);

    const handleSetItemClick = useCallback((params: ItemParams) => {
        const locProps = params.props;
        locProps.setItem(params.data.item);
    }, []);

    const handleClearItemClick = useCallback((params: ItemParams) => {
        const locProps = params.props;
        locProps.setItem('');
    }, []);

    return (
        <Menu id="location-context">
            <Item onClick={handleCheckClick}>Check</Item>
            <Item onClick={handleUncheckClick}>Uncheck</Item>
            <Separator />
            <Submenu label="Set Item">
                {
                    _.map(hintItems, (items, category) => (
                        <Submenu label={category}>
                            {
                                _.map(items, (listItem) => (
                                    <Item onClick={handleSetItemClick} data={{ item: listItem }}>{listItem}</Item>
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