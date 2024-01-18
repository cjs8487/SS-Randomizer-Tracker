import _ from 'lodash';
import { useCallback } from 'react';
import { Menu, Item, Separator, Submenu, ItemParams } from 'react-contexify';

import hintItems from '../data/hintItems.json';
import { LocationContextMenuProps } from './Location';
import images from '../itemTracker/Images';

type CtxProps<T = void> = ItemParams<LocationContextMenuProps, T>;
interface ItemData {
    item: string;
}

export default function LocationContextMenu() {
    const handleCheckClick = useCallback((params: CtxProps) => {
        const locProps = params.props!;
        locProps.handler(locProps.group, locProps.location, true);
    }, []);

    const handleUncheckClick = useCallback((params: CtxProps) => {
        const locProps = params.props!;
        locProps.handler(locProps.group, locProps.location, false);
    }, []);

    const handleSetItemClick = useCallback((params: CtxProps<ItemData>) => {
        const locProps = params.props!;
        locProps.setItem(params.data!.item);
    }, []);

    const handleClearItemClick = useCallback((params: CtxProps) => {
        const locProps = params.props!;
        locProps.setItem('');
    }, []);

    return (
        <Menu id="location-context">
            <Item onClick={handleCheckClick}>Check</Item>
            <Item onClick={handleUncheckClick}>Uncheck</Item>
            <Separator />
            <Submenu label="Set Item">
                {_.map(hintItems, (items, category) => (
                    <Submenu label={category}>
                        {_.map(items, (listItem) => (
                            <Item
                                onClick={handleSetItemClick}
                                data={{ item: listItem } satisfies ItemData}
                            >
                                <MenuItemWithIcon name={listItem} image={_.last(images[listItem])!} />
                            </Item>
                        ))}
                    </Submenu>
                ))}
            </Submenu>
            <Item onClick={handleClearItemClick}>Clear Item</Item>
        </Menu>
    );
}

export function MenuItemWithIcon({ name, image }: { name: string, image: string }) {
    return (
        <span style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div style={{ width: '26px', height: '26px', paddingRight: '6px' }}>
                <img
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                    src={image}
                    alt={name}
                />
            </div>
            {name}
        </span>
    );
}